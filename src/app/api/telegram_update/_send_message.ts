import { sendResponseSchema } from "./zod_schemas";

export async function sendMessage(chatId: string, text: string) {
  const response = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${text}`,
  );
  if (!response.ok) {
    console.error("Failed to send message", { status: 500, response: await response.text() });
    return new Response("Failed to send message", { status: 500 });
  }
  const data = (await response.json()) as unknown;
  console.log(`sent message ${text} to ${chatId}`, {data})
  const parsedData = sendResponseSchema.parse(data);
  return parsedData;
}
