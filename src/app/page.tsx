import Link from "next/link";

// import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
// import { ScrapeButton } from "~/components/ScrapeButton";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#0066cc] to-[#001a33] text-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-6 text-5xl font-bold">Ostsee Wasserstand-Alarm</h1>
          <p className="mb-8 text-xl">
            Bleiben Sie informiert über die Wasserstände der Ostsee - direkt auf
            Ihrem Smartphone
          </p>

          {/* Feature Cards */}
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-lg">
              <h3 className="mb-3 text-xl font-semibold">
                Echtzeitüberwachung
              </h3>
              <p>
                Kontinuierliche Überwachung der Wasserstände an der gesamten
                deutschen Ostseeküste
              </p>
            </div>

            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-lg">
              <h3 className="mb-3 text-xl font-semibold">
                Telegram-Benachrichtigungen
              </h3>
              <p>
                Sofortige Benachrichtigungen über Telegram, wenn Ihre
                festgelegten Grenzwerte erreicht werden
              </p>
            </div>

            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-lg">
              <h3 className="mb-3 text-xl font-semibold">
                Individuelle Einstellung
              </h3>
              <p>
                Legen Sie Ihre eigenen Grenzwerte für verschiedene Regionen fest
              </p>
            </div>
          </div>

          {/* Regions Section */}
          <div className="mt-16">
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
          <div className="mt-16">
            <Link href="/signup">
              <button className="rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold transition-colors hover:bg-blue-600">
                Jetzt mit Telegram verbinden
              </button>
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Kostenlos und ohne Installation - Sie benötigen nur Telegram
            </p>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
