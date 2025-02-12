import { createClient } from "~/lib/supabase/server";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { WarningForm } from "./_components/WarningForm";

export default async function WarningsSetupPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect("/login");
  }

  const lastWarning = await db.warnings.findFirst({
    where: {
      user_id: user.id,
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
        <div className="mb-8 flex items-center justify-end">
          <div className="justify-self-end text-sm text-gray-300">
            Schritt 1 von 2
          </div>
        </div>

        <h1 className="mb-8 text-3xl font-bold">Warnungen einrichten</h1>

        <WarningForm regions={regions} lastWarning={lastWarning} />
      </div>
    </main>
  );
}
