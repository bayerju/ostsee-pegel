import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "~/lib/auth";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const warningsRouter = createTRPCRouter({
  updateWarning: protectedProcedure
    .input(z.object({ regions: z.string().array(), highWaterThreshold: z.number(), lowWaterThreshold: z.number() }))
    .mutation(async ({ input, ctx}) => {
      const { regions, highWaterThreshold, lowWaterThreshold } = input;
      const user = ctx.user;
      const firstWarningOfUser = await ctx.db.warnings.findFirst({
        where: {
          user_id: user.id,
        },
      });
      const newWarning = await ctx.db.warnings.upsert({
        where: {
          id: firstWarningOfUser?.id ?? undefined,
        },
        update: {
          regions,
          highWaterThreshold,
          lowWaterThreshold,
        },
        create: {
          user_id: user.id,
          regions,
          highWaterThreshold,
          lowWaterThreshold,
        },
      })
      return {
        newWarning,
      };
    }),
    getFirstWarning: protectedProcedure.query(async ({ ctx }) => {
      const user = ctx.user;
      const firstWarningOfUser = await ctx.db.warnings.findFirst({
        where: {
          user_id: user.id,
        },
      });
      return firstWarningOfUser;
    }),
});
