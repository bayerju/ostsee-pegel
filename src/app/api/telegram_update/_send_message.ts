import { sendResponseSchema } from "./zod_schemas";

export async function sendMessage(chatId: string, text: string) {
  console.log(`Attempting to send Telegram message to chatId: ${chatId}`);
  console.log(`Message content: ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}`);
  
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${text}`,
    );

    if (!response.ok) {
      console.error("Failed to send message", { 
        status: response.status, 
        response: await response.text(),
        chatId,
        messageLength: text.length
      });
      return new Response("Failed to send message", { status: 500 });
    }
    const data = (await response.json()) as unknown;
    console.log(`sent message ${text} to ${chatId}`, {data})
    const parsedData = sendResponseSchema.parse(data);
    return parsedData;
  } catch (error) {
    console.error("Failed to send message", { error, chatId, text });
    throw error;
  }
}
