"use server";

import { createClient } from "~/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "~/server/db";

const warningsSchema = z.object({
  regions: z.array(z.string()).min(1, "Bitte mindestens eine Region auswählen"),
  highWaterThreshold: z.coerce
    .number()
    .min(0, "Hochwasser-Schwellenwert muss positiv sein")
    .max(100, "Hochwasser-Schwellenwert darf maximal 100 cm sein"),
  lowWaterThreshold: z.coerce
    .number()
    .min(-100, "Niedrigwasser-Schwellenwert muss mindestens -100 cm sein")
    .max(0, "Niedrigwasser-Schwellenwert darf maximal 0 cm sein"),
});

export async function setFirstWarning(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect("/login");
  }

  const validatedFields = warningsSchema.safeParse({
    regions: formData.getAll("regions"),
    highWaterThreshold: formData.get("highWaterThreshold"),
    lowWaterThreshold: formData.get("lowWaterThreshold"),
  });

  if (!validatedFields.success) {
    // You might want to handle this error differently
    throw new Error(validatedFields.error.errors[0]?.message);
  }

  const { regions, highWaterThreshold, lowWaterThreshold } = validatedFields.data;

  const existingWarning = await db.warnings.findFirst({
    where: {
      user_id: user.id,
    },
  });

  if (existingWarning) {
      await db.warnings.upsert({
        where: {
          id: existingWarning?.id ?? undefined,
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
    });
  } else {
    await db.warnings.create({
      data: {
        user_id: user.id,
        regions,
        highWaterThreshold,
        lowWaterThreshold,
      },
    });
  }

  redirect("/signup/notifications");
}
