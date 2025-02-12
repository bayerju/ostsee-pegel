import { type NextRequest } from "next/server";
import { db } from "~/server/db";
import { z } from "zod";
import { sendMessage } from "./_send_message";
import { isNil } from "lodash";

export const messageSchema = z.object({
  message_id: z.number().or(z.string()),
  from: z.object({
    id: z.number(),
    is_bot: z.boolean(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    username: z.string().optional(),
    language_code: z.string().optional(),
  }).passthrough(),
  chat: z.object({
    id: z.number(),
    first_name: z.string().optional(),
    username: z.string().optional(),
    type: z.string(),
  }).passthrough(),
  date: z.number(),
  text: z.string(),
}).passthrough();

const telegramUpdateSchema = z.object({
  ok: z.boolean(),
  result: z.array(z.object({
    update_id: z.number(),
    message: messageSchema,
  }).passthrough()),
}).passthrough();

export async function POST(request: NextRequest) {
  try {
    const fetchResult = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getUpdates`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!fetchResult.ok) {
      console.error("Failed to fetch updates", { status: 500 });
      return new Response("Failed to fetch updates", { status: 500 });
    }

    const data = await fetchResult.json() as unknown;
    const result = telegramUpdateSchema.safeParse(data);

    if (!result.success) {
      console.error("Invalid response format:", result.error, data);
      return new Response("Invalid response format", { status: 400 });
    }

    // Process messages
    for (const update of result.data.result) {
      const { message, update_id } = update;

      await db.telegram_messages.create({
        data: {
          messageId: message.message_id.toString(),
          telegramUserId: message.from.id.toString(),
          messageText: message.text,
          chatId: message.chat.id.toString(),
          telegramUsername: message.from.username,
        },
      });
      // if (!message.text.startsWith("/start ")) continue;
      // Check for 6 digit code in message text
      const sixDigitCode = (/\b\d{6}\b/.exec(message.text))?.[0];
      if (message.text.startsWith("/start ")) {
        const response = await sendMessage(message.chat.id, `Hallo ${message.from.first_name} ${message.from.last_name}! Bitte gebe den folgenden 6 stelligen Code ein um die Benachrichtigungen zu aktivieren:\n\n`);
        console.log(response);
      }
      if (!isNil(sixDigitCode) ) {
        const otp = await db.otps.findFirst({
          where: {
            code: sixDigitCode,
            isActive: true,
            expiresAt: {
              gt: new Date(),
            },
          },
        });
        if (!otp) {
          await sendMessage(message.chat.id, `Der Code ist ungültig oder abgelaufen. Bitte erstelle dir auf der webseite einen neuen Code um die Benachrichtigungen zu aktivieren.\n\n${process.env.NEXT_PUBLIC_WEB_URL}`);
          continue;
        };

        await db.telegram_services.upsert({
          where: { userId: otp.userId },
          update: {
            username: message.from.username,
            telegramUserId: message.from.id.toString(),
          },
          create: {
            userId: otp.userId,
            chatId: message.from.id.toString(),
            username: message.from.username,
            telegramUserId: message.from.id.toString(),
          },
        });

        await sendMessage(message.from.id, "Die Benachrichtigungen wurden erfolgreich aktiviert. Du erhältst nun eine Benachrichtigung wenn der Wasserstand sich unter oder über deine gesetzten Schwellwerte verändert.");
        continue;
      }
      const telegramService = await db.telegram_services.findFirst({
        where: {
          telegramUserId: message.from.id.toString(),
        },
      });
      if (telegramService) {
        await sendMessage(message.chat.id, "Es sieht so aus als wäre dein account bereits erfolgreich verknüpft. Wenn du uns Kontaktieren wills, mache das doch am besten per Email an: wasserstands-warnung@protonmail.com\n\n");
        continue;
      }
      await sendMessage(message.chat.id, "Bitte gebe den Code ein um die Benachrichtigungen zu aktivieren. Solltest du nicht wissen welchen Code ich meine, schaue doch einfach auf unserer Webseite nach.\n\n");

      
      const otp = message.text.split(" ")[1];
      if (!otp) continue;

      

    return new Response("Success", { status: 200 });}
  } catch (error) {
    console.error("Error processing updates:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
