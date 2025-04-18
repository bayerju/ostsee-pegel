"use server";

// import { createClient } from "~/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "~/server/db";
import { headers } from 'next/headers';
import { auth } from "~/lib/auth";

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

export async function setFirstWarning(prevState: {message: string}, formData: FormData) {
  const headersList = await headers();
  const referer = headersList.get('referer');
  
  // const supabase = await createClient();
  // const {
  //   data: { user },
  //   error: authError,
  // } = await supabase.auth.getUser();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }
  const user = session.user;

  const validatedFields = warningsSchema.safeParse({
    regions: formData.getAll("regions"),
    highWaterThreshold: formData.get("highWaterThreshold"),
    lowWaterThreshold: formData.get("lowWaterThreshold"),
  });

  if (!validatedFields.success) {
    // You might want to handle this error differently
    throw new Error(validatedFields.error.errors[0]?.message);
  }

  const { regions, highWaterThreshold, lowWaterThreshold } =
    validatedFields.data;

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
        user: {
          connect: {
            id: user.id,
          },
        },
        regions,
        highWaterThreshold,
        lowWaterThreshold,
      },
    });
  }
if (referer?.endsWith("/signup/warnings"))
  redirect("/signup/notifications");
return { message: "success" };
}
