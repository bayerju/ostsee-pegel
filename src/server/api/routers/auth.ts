import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createClient } from "~/lib/supabase/server";
// import { redirect } from "next/navigation";
import { TRPCError } from "@trpc/server";
import { clerkClient } from '@clerk/nextjs/server';
import { tryCatch } from "~/lib/try-catch";
import { db } from "~/server/db";

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(8) }))
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const clerk = await clerkClient();
      const {data: user, error} = await tryCatch(clerk.users.createUser({
        emailAddress: [email],
        password: password,
      }))
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
          cause: error,
        })
      }
      if (user.id) {
        await db.profiles.create({
          data: {
            email: email,
            email_confirmed: false,
            authId: user.id,
            phone: "",
            phone_confirmed: false,
          },
        });
    
        // const session = await clerk.sessions
        // const { data: session, error: sessionError } = await tryCatch(
        //   clerk.sessions.createSession({
        //     userId: user.id,
        //     lastActiveAt: new Date(),
        //     expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        //   })
        // );

        // if (sessionError) {
        //   throw new TRPCError({
        //     code: "INTERNAL_SERVER_ERROR",
        //     message: "Failed to create session",
        //     cause: sessionError,
        //   });
        // }

        return {
          user,
          // sessionId: session.id,
          // token: session.token,
        };
      }
    }),

  // login: publicProcedure
  //   .input(z.object({ email: z.string().email(), password: z.string().min(8) }))
  //   .mutation(async ({ input, ctx }) => {
  //     const { email, password } = input;
  //     const clerk = await clerkClient();

  resetPassword: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input, ctx }) => {
      const { email } = input;
      const supabase = await createClient();
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
         throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to reset password",
        });
      }
    //   redirect("/auth/confirm");
      return data;
    }),

    changePassword: publicProcedure
    .input(z.object({ password: z.string().min(8), confirmPassword: z.string().min(8) }))
    .mutation(async ({ input, ctx }) => {
        const { password, confirmPassword } = input;
        if (password !== confirmPassword) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Passwords do not match",
            })
        }
        const supabase = await createClient();
        const { data, error } = await supabase.auth.updateUser({ password });
        if (error && error.code !== "same_password") {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: error.message,
            })
        }
        return data;
    })
});
