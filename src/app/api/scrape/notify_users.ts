import { db } from "~/server/db";
import { type ParsedData } from "./types";
import { sendMessage } from "../telegram_update/_send_message";
import { BSH_URL } from "~/scripts/scrape";
import { isNil } from "lodash";

export async function notifyUsers(predictions: ParsedData) {
  const users = await db.profiles.findMany({
    where: {
      warnings: {
        some: {
          OR: predictions.data.map((iPrediction) => ({
            AND: [
              { regions: { has: iPrediction.location } },
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
              { regions: { has: iPrediction.location } },
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

  const userWithPredictionWarningMapping = users.map(iUser => {
    return {...iUser,
      predictionWarnings: predictions.data.map(iPrediction => {
        const locationWarnings = iUser.warnings
          .filter(iWarning => iWarning.regions.some(iRegion => iRegion === iPrediction.location))
          .map(iWarning => ({
            ...iWarning,
            exceedsLowWaterThreshold: iPrediction.min <= iWarning.lowWaterThreshold,
            exceedsHighWaterThreshold: iPrediction.max >= iWarning.highWaterThreshold,
            // isActive: iPrediction.min <= iWarning.lowWaterThreshold || iPrediction.max >= iWarning.highWaterThreshold
          }))
          .filter(iWarning => iWarning.exceedsHighWaterThreshold || iWarning.exceedsLowWaterThreshold);

        return {
          prediction: iPrediction,
          warnings: locationWarnings,
        }
        // const relevantPredictions = iWarning.regions.map(iRegion => {
        //   const prediction = predictions.data.find(iPrediction => iPrediction.location === iRegion);
        //   return {prediction, warning: iWarning}
        // });
        // return relevantPredictions.map(iRelevantPrediction => 
        //   iRelevantPrediction.prediction!.min <= iRelevantPrediction.warning.highWaterThreshold 
        //   && iRelevantPrediction.prediction!.max >= iRelevantPrediction.warning.lowWaterThreshold);
      })
      .filter(iPredictionWarningMapping => iPredictionWarningMapping.warnings.length > 0)
    };
  });

  console.log({userWithPredictionWarningMapping});

  await Promise.all(userWithPredictionWarningMapping.map(async (user) => {
    const userWasntNotifiedIn24Hours = user.warnings.some(iWarning => isNil(iWarning.last_notified) || iWarning.last_notified < new Date(Date.now() - 1000 * 60 * 60 * 24)); 
    if (user.telegramService?.chatId && userWasntNotifiedIn24Hours && user.predictionWarnings.length > 0) {
      const message = `Achtung folgende Warnung(en) haben angeschlagen: \n ${user.predictionWarnings
        .map((iPredictionWarning) => ` Das Wasser in ${iPredictionWarning.prediction.location} liegt zwischen ${iPredictionWarning.prediction.min} und ${iPredictionWarning.prediction.max} Meter.`)
        .join("\n")} \n\n ${BSH_URL}`;
      await sendMessage(user.telegramService.chatId, message);
      await db.warnings.updateMany({
        where: { user_id: user.authId },
        data: { last_notified: new Date() },
      });
    }
  }));

  // const usersToNotify = users
  // .map(iUser => {

  //   return {...iUser,
  //     predictionWarnings: iUser.warnings.map(iWarning => {
  //       const relevantPredictions = iWarning.regions.map(iRegion => {
  //         const prediction = predictions.data.find(iPrediction => iPrediction.location === iRegion);
  //         return {prediction, warning: iWarning}
  //       });
  //       return relevantPredictions.map(iRelevantPrediction => iRelevantPrediction.prediction!.min <= iRelevantPrediction.warning.highWaterThreshold && iRelevantPrediction.prediction!.max >= iRelevantPrediction.warning.lowWaterThreshold);
  //     })
  //   };
  // })
  // .filter(user => {
  //   const userHasTelegramService = user.telegramService?.chatId;
  //   const userAreadyWasNotifiedInTheLast24Hours = user.warnings.some(iWarning => isNil(iWarning.last_notified) || iWarning.last_notified < new Date(Date.now() - 1000 * 60 * 60 * 24)); 
  //   // predictions.data.forEach(iPrediction => {
  //   //   if (user.warnings.some(iWarning => iWarning.regions.some(region => region === iPrediction.location))) {
  //   //     return true;
  //   //   }
  //   // });
  //   return userHasTelegramService && userAreadyWasNotifiedInTheLast24Hours;
  // });


  // await Promise.all(usersToNotify.map(async (user) => {
  //   const warningForLocationActive = user.warnings.some(iWarning => predictions.data.some(iPrediction => iPrediction.location === iWarning.regions[0]));

  //   const userWasntNotifiedIn24Hours = user.warnings.some(iWarning => isNil(iWarning.last_notified) || iWarning.last_notified < new Date(Date.now() - 1000 * 60 * 60 * 24)); 
  //   if (user.telegramService?.chatId && userWasntNotifiedIn24Hours) {
  //     const message = `Achtung folgende Warnung hat angeschlagen: ${user.warnings.map((iWarning) => `${iWarning.regions.join(", ")}: Untere Grenze: ${iWarning.lowWaterThreshold} - Obere Grenze: ${iWarning.highWaterThreshold}`).join("\n")} \n\n ${BSH_URL}`;
  
  //     await sendMessage(user.telegramService.chatId, message);
  //     await db.warnings.updateMany({
  //       where: { user_id: user.authId },
  //       data: { last_notified: new Date() },
  //     });
  //   }
  // }));
}
