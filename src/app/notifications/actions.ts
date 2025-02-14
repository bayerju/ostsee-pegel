"use server";

import { createClient } from "~/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "~/server/db";

export async function setNotifications(formData: FormData): Promise<void> {
  const telegramUsername = formData.get("telegramUsername");
  const emailNotifications = formData.get("emailNotifications") === "on";

  // TODO: Save to database
  console.log({ telegramUsername, emailNotifications });

  // Redirect to dashboard or confirmation page
  redirect("/dashboard");
}

const phoneNumberRegex = /^\+[1-9]\d{1,14}$/;
const phoneNumberSchema = z
  .string()
  .regex(phoneNumberRegex, "Ungültige Telefonnummer");

export async function setTelegram(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect("/login");
  }

  const telegramUsernameOrNumber = formData.get("telegramUsernameOrNumber");

  const {
    data: validatedString,
    success: validatedStringSuccess,
    error: validatedStringError,
  } = z.string().safeParse(telegramUsernameOrNumber);
  if (!validatedStringSuccess) {
    throw new Error(validatedStringError.errors[0]?.message);
  }

  const {
    data: validatedPhoneNumber,
    success: validatedPhoneNumberSuccess,
    error: validatedPhoneNumberError,
  } = phoneNumberSchema.safeParse(telegramUsernameOrNumber);
  if (validatedPhoneNumberSuccess) {
    console.log("Telefonnummer");
    const updatedUser = await db.profiles.update({
      where: {
        authId: user.id,
      },
      data: {
        phone: validatedPhoneNumber,
      },
    });
    return;
  }

  if (validatedString.startsWith("@")) {
    const updatedUser = await db.profiles
      .update({
        where: {
          authId: user.id,
        },
        data: {
          telegram_username: validatedString,
        },
      })
      .catch((error) => {
        console.error(error);
        throw new Error(
          "Fehler beim Aktualisieren des Telegram-Benutzernamens",
        );
      });
    return;
  }

  console.log({ telegramUsernameOrNumber });
}
