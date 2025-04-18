"use server";

import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { headers } from "next/headers";
// import { createClient } from "~/lib/supabase/server";

function generateOTP(length: number): string {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }

  return otp;
}

export async function createNotificationOTP() {
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  const session = await auth.api.getSession({headers: await headers()});

  const user = session?.user;

  if (!user) {
    throw new Error("User not found");
  }

  await db.otps.deleteMany({
    where: {
      expiresAt: {
        lte: new Date(),
      },
    },
  });

  let otpValue = generateOTP(6);
  let otp = null;
  const maxAttempts = 5;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (attempt > 0) {
      otpValue = generateOTP(6);
    }
    try {
      // Store in database with 10-minute expiration
      otp = await db.otps.create({
        data: {
          code: otpValue,
          userId: user.id,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        },
      });
      break; // Successfully created OTP, exit loop
    } catch (error) {
      if (attempt === maxAttempts - 1) {
        throw new Error("Failed to generate unique OTP after multiple attempts");
      }
      // If it's a unique constraint error, continue to next attempt
      // Otherwise, throw the error
      if (!(error instanceof Error && error.message.includes("Unique constraint"))) {
        throw error;
      }
    }
  }

  if (otp) {
    await db.otps.deleteMany({
      where: {
        userId: user.id,
        id: {
          not: otp.id,
        },
      },
    });
    return otpValue;
  }

  throw new Error("Failed to create OTP");
}
