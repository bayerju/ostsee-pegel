"use server";

import { createClient } from "@supabase/supabase-js"
import { redirect } from "next/navigation"

export async function setNotifications(formData: FormData): Promise<void> {
  const telegramUsername = formData.get("telegramUsername");
  const emailNotifications = formData.get("emailNotifications") === "on";

  // TODO: Save to database
  console.log({ telegramUsername, emailNotifications });

  // Redirect to dashboard or confirmation page
  redirect("/dashboard");
}
