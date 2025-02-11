"use server";

import { createClient } from "@supabase/supabase-js"
import { redirect } from "next/navigation"

export async function setWarnings(formData: FormData): Promise<void> {
  const regions = formData.getAll("regions");
  const highWaterThreshold = formData.get("highWaterThreshold");
  const lowWaterThreshold = formData.get("lowWaterThreshold");

  // TODO: Save to database
  console.log({ 
    regions, 
    highWaterThreshold, 
    lowWaterThreshold 
  });

  // Redirect to next step
  redirect("/signup/notifications");
}
