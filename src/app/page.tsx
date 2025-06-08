// import { SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
// import { createClient } from "~/lib/supabase/server";
import { redirect } from "next/navigation";

// import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
// import { ScrapeButton } from "~/components/ScrapeButton";

export default async function Home() {
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (user) {
  //   redirect("/settings");
  // }

  // const hello = await api.post.hello({ text: "from tRPC" });

  // const session = await clerkClient.sessions.getUser();
  const session = await auth.api.getSession({ headers: await headers() });

  console.log({ session });
  if (session?.user.id) {
    redirect("/protected/settings");
  }

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      {/* <SignedIn>
        {redirect("/settings")}
      </SignedIn> */}
      {/* <SignedOut> */}
      <main className="flex min-h-screen flex-col items-center">
        {/* Hero Section */}
        <div className="w-full max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold">Ostsee Wasserstand-Alarm</h1>
              <p className="text-lg">
                Bleiben Sie informiert über die Wasserstände der Ostsee - direkt
                auf Ihrem Smartphone
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm">Registrierung in 2 Minuten</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span className="text-sm">Zuverlässige Warnungen</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
                <p className="mb-6 text-center text-lg text-gray-700">
                  In 2 min zur ersten Telegram-Warnung
                </p>
                <Link href="/signup">
                  <button className="w-full rounded-lg bg-blue-500 px-6 py-4 text-base font-medium text-white transition-colors hover:bg-blue-600">
                    Kostenlos ausprobieren
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full max-w-7xl px-4 py-12">
          <h2 className="mb-6 text-3xl font-bold">Funktionen</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white/5 p-4">
              <h3 className="mb-2 text-xl font-semibold">Echtzeit-Warnungen</h3>
              <p className="text-gray-300">
                Erhalten Sie sofortige Benachrichtigungen bei kritischen
                Wasserständen
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <h3 className="mb-2 text-xl font-semibold">Mehrere Standorte</h3>
              <p className="text-gray-300">
                Überwachen Sie mehrere Standorte gleichzeitig
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <h3 className="mb-2 text-xl font-semibold">Benutzerfreundlich</h3>
              <p className="text-gray-300">
                Einmal einrichten und nie wieder Sorgen machen.
              </p>
            </div>
          </div>
        </div>

        {/* Regions Section */}
        <div className="w-full max-w-7xl px-4 py-12">
          <h2 className="mb-6 text-3xl font-bold">Überwachte Regionen</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white/5 p-4">Kieler Bucht</div>
            <div className="rounded-lg bg-white/5 p-4">Lübecker Bucht</div>
            <div className="rounded-lg bg-white/5 p-4">Westlich Rügens</div>
            <div className="rounded-lg bg-white/5 p-4">Östlich Rügens</div>
            <div className="rounded-lg bg-white/5 p-4">Kleines Haff</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full max-w-7xl px-4 py-12 text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Bereit für Ihre Sicherheit?
          </h2>
          <p className="mb-8 text-lg">
            Registrieren Sie sich jetzt und bleiben Sie über Wasserstände
            informiert
          </p>
          <Link href="/signup">
            <button className="rounded-lg bg-blue-500 px-8 py-3 text-lg font-semibold transition-colors hover:bg-blue-600">
              Jetzt registrieren
            </button>
          </Link>
          <p className="mt-4 text-sm text-gray-300">
            Kostenlos bis November 2025
          </p>
        </div>
      </main>

      {/* </SignedOut> */}
    </HydrateClient>
  );
}
