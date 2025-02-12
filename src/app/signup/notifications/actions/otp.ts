"use server"

import { db } from "~/server/db";
import { createClient } from "~/lib/supabase/server";

function generateOTP(length: number): string {
  const digits = "0123456789";
  let otp = "";

    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * digits.length)];
    }
    
    return otp;
}


export async function createNotificationOTP() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  // Generate a 6-digit OTP
  const otpValue = generateOTP(6);
  
  // Store in database with 10-minute expiration
  const otp = await db.otps.create({
    data: {
      code: otpValue,
      userId: user.id,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    }
  });

  if (otp) {
    await db.otps.updateMany({
      where: {
        userId: user.id,
        isActive: true,
        id: {
          not: otp.id,
        },
      },
      data: {
        isActive: false,
      },
    });
    return otpValue;
  }

  throw new Error("Failed to create OTP");
}