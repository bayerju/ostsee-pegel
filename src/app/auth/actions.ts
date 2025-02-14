"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "~/server/db";

import { createClient } from "~/lib/supabase/server";
import { isNil } from "lodash";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data: user } = await supabase.auth.signUp(data);


  if (error) {
    console.error(error);
    return;
  }

  if (isNil(user.user)) {
    console.error("User not found");
    return;
  }

  await db.profiles.create({
    data: {
      email: data.email,
      email_confirmed: false,
      authId: user.user.id,
      phone: "",
      phone_confirmed: false,
    },
  });

  const { error: signInError } = await supabase.auth.signInWithPassword(data);

  if (signInError) {
    console.error(signInError);
    return;
  }

  revalidatePath("/", "layout");
  redirect("/signup/warnings");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
