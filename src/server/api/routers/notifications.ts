import z from "node_modules/zod/lib";
import { protectedProcedure } from "../trpc";

import { createTRPCRouter } from "../trpc";

export const notificationServices = {
  telegram: "telegram" as const,
  email: "email" as const,
  sms: "sms" as const,
  whatsapp: "whatsapp" as const,
}

export const notificationsRouter = createTRPCRouter({
  getActiveNotificationService: protectedProcedure
  .query(async ({ ctx }) => {
    const user = ctx.user;
    const telegramNotification = await ctx.db.telegram_services.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (telegramNotification?.isActive) return {service: notificationServices.telegram, id: telegramNotification.id};
    return null;
  }),
  updateTelegramService: protectedProcedure
  .input(z.object({
    isActive: z.boolean(),
  })).mutation(async ({ input, ctx }) => {
    const user = ctx.user;
    const telegramNotification = await ctx.db.telegram_services.update({
      where: { userId: user.id },
      data: {
        isActive: input.isActive,
      },
    });
  }),
});
