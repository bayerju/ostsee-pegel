import { z } from "zod";
import { messageSchema } from "./route";

const sendResponseSchema = z.object({
  ok: z.boolean(),
  result: z.object({
    message: messageSchema,
  }).passthrough(),
}).passthrough();

export async function sendMessage(chatId: number, text: string) {
  const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${text}`);
  if (!response.ok) {
    console.error("Failed to send message", { status: 500 });
    return new Response("Failed to send message", { status: 500 });
  }
  const data = await response.json() as unknown;
  const parsedData = sendResponseSchema.parse(data);
  return parsedData;
}
