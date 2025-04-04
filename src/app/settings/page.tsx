// import { createClient } from "~/lib/supabase/server";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { WarningForm } from "~/app/signup/warnings/_components/WarningForm";
import { auth } from "@clerk/nextjs/server";
import { isNil } from "lodash";

export default async function SettingsPage() {
  // const supabase = await createClient();
  // const {
  //   data: { user },
  //   error: authError,
  // } = await supabase.auth.getUser();
  const user = await auth();
  if (isNil(user.userId)) {
    redirect("/login");
  }

  const currentWarning = await db.warnings.findFirst({
    where: {
      user_id: user.userId,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const regions = [
    "Kieler Bucht",
    "Lübecker Bucht",
    "Westlich Rügens",
    "Östlich Rügens",
    "Kleines Haff",
  ];

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#0066cc] to-[#001a33] text-white">
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <h1 className="mb-8 text-3xl font-bold">Warnungen konfigurieren</h1>

        <WarningForm
          regions={regions}
          lastWarning={currentWarning}
          submitButtonText="Einstellungen speichern"
          redirectTo="/settings"
        />
      </div>
    </main>
  );
}
