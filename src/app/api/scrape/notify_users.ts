import { db } from "~/server/db";
import { type ParsedData } from "./types";
import { sendMessage } from "../telegram_update/_send_message";
import { BSH_URL } from "~/scripts/scrape";
export async function notifyUsers(predictions: ParsedData) {
  const users = await db.profiles.findMany({
    where: {
      warnings: {
        some: {
          OR: predictions.data.map((iPrediction) => ({
            AND: [
              { location: iPrediction.location },
              { 
                OR: [
                  { highWaterThreshold: { gte: iPrediction.max } },
                  { lowWaterThreshold: { lte: iPrediction.min } }
                ]
              }
            ]
          }))
        },
      },
    },
    include: {
      telegramService: true,
      warnings: {
        where: {
          OR: predictions.data.map((iPrediction) => ({
            AND: [
              { location: iPrediction.location },
              { 
                OR: [
                  { highWaterThreshold: { gte: iPrediction.max } },
                  { lowWaterThreshold: { lte: iPrediction.min } }
                ]
              }
            ]
          }))
        }
      }
    }
  });

  await Promise.all(users.map(async (user) => {
    if (user.telegramService?.chatId) {
      await sendMessage(user.telegramService.chatId, `Achtung folgende Warnung hat angeschlagen: ${user.warnings.map((iWarning) => `${iWarning.regions.join(", ")}: ${iWarning.lowWaterThreshold} - ${iWarning.highWaterThreshold}`).join("\n")} \n\n ${BSH_URL}`);
    }
  }));
}