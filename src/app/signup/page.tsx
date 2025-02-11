import Link from "next/link";
import { signup } from "../auth/actions";

export default function SignupPage() {
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
        <Link
          href="/"
          className="mb-8 inline-block text-blue-300 hover:text-blue-400"
        >
          ← Zurück zur Startseite
        </Link>

        <h1 className="mb-8 text-3xl font-bold">Konto erstellen</h1>

        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="mb-2 block text-lg">E-Mail Adresse</label>
            <input
              type="email"
              name="email"
              className="w-full rounded-lg border border-white/20 bg-white/10 p-3 focus:border-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-lg">Passwort</label>
            <input
              type="password"
              name="password"
              className="w-full rounded-lg border border-white/20 bg-white/10 p-3 focus:border-blue-400 focus:outline-none"
              required
              minLength={8}
            />
          </div>

          {/* Telegram Username */}
          <div>
            <label className="mb-2 block text-lg">Telegram Benutzername</label>
            <input
              type="text"
              name="telegramUsername"
              placeholder="@benutzername"
              className="w-full rounded-lg border border-white/20 bg-white/10 p-3 focus:border-blue-400 focus:outline-none"
              required
            />
            <p className="mt-2 text-sm text-gray-300">
              Ohne das @ Symbol eingeben
            </p>
          </div>

          {/* Regions Selection */}
          <div>
            <label className="mb-2 block text-lg">Regionen auswählen</label>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {regions.map((region) => (
                <label key={region} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="regions"
                    value={region}
                    className="h-4 w-4"
                  />
                  <span>{region}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Warning Threshold */}
          <div>
            <label className="mb-2 block text-lg">
              Warnungsschwellenwert (cm)
              <span className="ml-2 text-sm text-yellow-300">
                Erste Benachrichtigung
              </span>
            </label>
            <input
              type="range"
              name="warningThreshold"
              min="0"
              max="100"
              defaultValue="30"
              className="w-full accent-yellow-400"
            />
            <div className="flex justify-between text-sm">
              <span>0 cm</span>
              <span className="text-yellow-300">Standard: 30 cm</span>
              <span>100 cm</span>
            </div>
          </div>

          {/* Alert Threshold */}
          <div>
            <label className="mb-2 block text-lg">
              Alarmschwellenwert (cm)
              <span className="ml-2 text-sm text-red-400">
                Dringende Benachrichtigung
              </span>
            </label>
            <input
              type="range"
              name="alertThreshold"
              min="0"
              max="100"
              defaultValue="50"
              className="w-full accent-red-400"
            />
            <div className="flex justify-between text-sm">
              <span>0 cm</span>
              <span className="text-red-400">Standard: 50 cm</span>
              <span>100 cm</span>
            </div>
          </div>

          <p className="text-sm text-gray-300">
            Der Warnungsschwellenwert sollte niedriger als der
            Alarmschwellenwert sein. Sie erhalten unterschiedliche
            Benachrichtigungen je nach überschrittenem Schwellenwert.
          </p>

          {/* Submit Button */}
          <button
            formAction={signup}
            type="submit"
            className="w-full rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold transition-colors hover:bg-blue-600"
          >
            Konto erstellen
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Bereits registriert?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300">
              Hier anmelden
            </Link>
          </p>
        </div>

        {/* Instructions */}
        <div className="mt-8 rounded-lg bg-white/10 p-6">
          <h2 className="mb-4 text-xl font-semibold">Nächste Schritte:</h2>
          <ol className="list-inside list-decimal space-y-2">
            <li>Öffnen Sie Telegram</li>
            <li>Suchen Sie nach unserem Bot: @OstseeWasserBot</li>
            <li>Starten Sie den Bot mit dem /start Befehl</li>
            <li>Sie erhalten eine Bestätigungsnachricht</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
