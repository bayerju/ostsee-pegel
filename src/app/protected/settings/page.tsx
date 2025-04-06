// import { createClient } from "~/lib/supabase/server";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { WarningForm } from "~/app/protected/signup_flow/warnings/_components/WarningForm";
// import { auth } from "@clerk/nextjs/server";
import { isNil } from "lodash";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { api } from "~/trpc/server";

export default async function SettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (isNil(session?.session.userId)) {
    redirect("/login");
  }

  const currentWarning = await db.warnings.findFirst({
    where: {
      user_id: session?.session.userId,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  // const currentWarning = trpc.warnings.getFirstWarning.useQuery();

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
