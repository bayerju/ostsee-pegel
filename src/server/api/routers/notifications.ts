import { z } from "zod/v4";
import { protectedProcedure } from "../trpc";

import { createTRPCRouter } from "../trpc";
import { sendVerifySms, verifySmsCode } from "~/lib/sms/send_sms";
import { TRPCError } from "@trpc/server";

export const notificationServices = {
  telegram: "telegram" as const,
  email: "email" as const,
  sms: "sms" as const,
  whatsapp: "whatsapp" as const,
}

export const notificationsRouter = createTRPCRouter({
  getNotificationServices: protectedProcedure
  .query(async ({ ctx }) => {
    const user = ctx.user;
    const telegramNotification = await ctx.db.telegram_services.findUnique({
      where: {
        userId: user.id,
      },
    });

    const smsNotification = await ctx.db.sms_services.findUnique({
      where: {
        userId: user.id,
      },
    });
    return {
      telegram: telegramNotification,
      sms: smsNotification,
    };
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
  verifySms: protectedProcedure
  .input(z.object({
    to: z.e164(),
  })).mutation(async ({ input, ctx }) => {
    const {to} = input
    const verification = await sendVerifySms(to);
    const smsService = await ctx.db.sms_services.upsert({
      where: {
        userId: ctx.user.id,
      },
      update: {
        phone: to,
      },
      create: {
        userId: ctx.user.id,
        phone: to,
      },
    });

  }),
  verifySmsCode: protectedProcedure
  .input(z.object({
    code: z.string(),
  })).mutation(async ({ input, ctx }) => {
    const {code} = input;
    const smsService = await ctx.db.sms_services.findUnique({
      where: {
        userId: ctx.user.id,
      },
    });

    if (!smsService) {
      throw new Error("SMS service not found");
    }

    const verification = await verifySmsCode(smsService.phone, code);
    if (verification.status === "approved") {
      await ctx.db.sms_services.update({
        where: {
          id: smsService.id,
        },
        data: {
          isVerified: true,
        },
      });
      return {
        success: true,
        message: "SMS verification successful",
      };
    } else if (verification.status === "failed") {
      throw new Error("Invalid verification code");
    } else {
      console.error("something went wrong in the trpc endpoint while verifying sms code", {verification})
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "something went wrong during sms verification trpc endpoint",
      });
    }
  }),
  activateSms: protectedProcedure
  .input(z.object({
    isActive: z.boolean(),
  })).mutation(async ({ input, ctx }) => {
    const {isActive} = input;
    await ctx.db.sms_services.update({
      where: {
        userId: ctx.user.id,
      },
      data: {
        isActive: isActive,
      },
    });
  }),
});
