"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [warningThreshold, setWarningThreshold] = useState<number>(30);
  const [alertThreshold, setAlertThreshold] = useState<number>(50);
  const [error, setError] = useState("");

  const regions = [
    "Kieler Bucht",
    "Lübecker Bucht",
    "Westlich Rügens",
    "Östlich Rügens",
    "Kleines Haff",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Die Passwörter stimmen nicht überein");
      return;
    }

    if (password.length < 8) {
      setError("Das Passwort muss mindestens 8 Zeichen lang sein");
      return;
    }

    if (warningThreshold >= alertThreshold) {
      setError(
        "Der Warnungsschwellenwert muss niedriger als der Alarmschwellenwert sein",
      );
      return;
    }

    try {
      // TODO: Implement the signup logic
      console.log({
        email,
        password,
        telegramUsername,
        selectedRegions,
        warningThreshold,
        alertThreshold,
      });
    } catch (err) {
      setError(
        "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
      );
    }
  };

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

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="mb-2 block text-lg">E-Mail Adresse</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 p-3 focus:border-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-lg">Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 p-3 focus:border-blue-400 focus:outline-none"
              required
              minLength={8}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-lg">Passwort bestätigen</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 p-3 focus:border-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Telegram Username */}
          <div>
            <label className="mb-2 block text-lg">Telegram Benutzername</label>
            <input
              type="text"
              value={telegramUsername}
              onChange={(e) => setTelegramUsername(e.target.value)}
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
                    checked={selectedRegions.includes(region)}
                    onChange={(e) => {
                      setSelectedRegions(
                        e.target.checked
                          ? [...selectedRegions, region]
                          : selectedRegions.filter((r) => r !== region),
                      );
                    }}
                    className="h-4 w-4"
                  />
                  <span>{region}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Threshold Settings */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Schwellenwerte</h3>

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
                min="0"
                max="100"
                value={warningThreshold}
                onChange={(e) => setWarningThreshold(Number(e.target.value))}
                className="w-full accent-yellow-400"
              />
              <div className="flex justify-between text-sm">
                <span>0 cm</span>
                <span className="text-yellow-300">
                  Aktuell: {warningThreshold} cm
                </span>
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
                min="0"
                max="100"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(Number(e.target.value))}
                className="w-full accent-red-400"
              />
              <div className="flex justify-between text-sm">
                <span>0 cm</span>
                <span className="text-red-400">
                  Aktuell: {alertThreshold} cm
                </span>
                <span>100 cm</span>
              </div>
            </div>

            <p className="text-sm text-gray-300">
              Der Warnungsschwellenwert sollte niedriger als der
              Alarmschwellenwert sein. Sie erhalten unterschiedliche
              Benachrichtigungen je nach überschrittenem Schwellenwert.
            </p>
          </div>

          {/* Submit Button */}
          <button
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
