"use client";

import Link from "next/link";
import { setNotifications } from "~/app/notifications/actions";
import { useState } from "react";

type NotificationMethod = "email" | "telegram" | "whatsapp" | "sms" | null;

export default function NotificationsSetupPage() {
  const [selectedMethod, setSelectedMethod] =
    useState<NotificationMethod>(null);

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#0066cc] to-[#001a33] text-white">
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/signup/warnings"
            className="text-blue-300 hover:text-blue-400"
          >
            ← Zurück
          </Link>
          <div className="text-sm text-gray-300">Schritt 3 von 3</div>
        </div>

        <h1 className="mb-8 text-3xl font-bold">
          Benachrichtigungsmethode auswählen
        </h1>

        {!selectedMethod ? (
          <div className="space-y-4">
            {/* Email Option */}
            <button
              onClick={() => setSelectedMethod("email")}
              className="flex w-full items-center justify-between rounded-lg border border-white/20 bg-white/5 p-6 text-left transition-colors hover:bg-white/10"
            >
              <div>
                <h2 className="text-xl font-semibold">E-Mail</h2>
                <p className="mt-1 text-sm text-gray-300">
                  Erhalten Sie detaillierte Benachrichtigungen per E-Mail
                </p>
              </div>
              <span className="text-sm text-green-400">Kostenlos</span>
            </button>

            {/* Telegram Option */}
            <button
              onClick={() => setSelectedMethod("telegram")}
              className="flex w-full items-center justify-between rounded-lg border border-white/20 bg-white/5 p-6 text-left transition-colors hover:bg-white/10"
            >
              <div>
                <h2 className="text-xl font-semibold">Telegram</h2>
                <p className="mt-1 text-sm text-gray-300">
                  Erhalten Sie sofortige Benachrichtigungen direkt in Telegram
                </p>
              </div>
              <span className="text-sm text-green-400">Kostenlos</span>
            </button>

            {/* WhatsApp Option */}
            <button
              disabled
              className="flex w-full cursor-not-allowed items-center justify-between rounded-lg border border-white/10 bg-white/5 p-6 text-left opacity-50"
            >
              <div>
                <h2 className="text-xl font-semibold">WhatsApp</h2>
                <p className="mt-1 text-sm text-gray-300">
                  Erhalten Sie Benachrichtigungen direkt in WhatsApp (Coming
                  Soon)
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-yellow-400">Premium</div>
                <div className="text-sm text-gray-300">2€/Monat</div>
              </div>
            </button>

            {/* SMS Option */}
            <button
              disabled
              className="flex w-full cursor-not-allowed items-center justify-between rounded-lg border border-white/10 bg-white/5 p-6 text-left opacity-50"
            >
              <div>
                <h2 className="text-xl font-semibold">SMS</h2>
                <p className="mt-1 text-sm text-gray-300">
                  Erhalten Sie Benachrichtigungen per SMS (Coming Soon)
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-yellow-400">Premium</div>
                <div className="text-sm text-gray-300">3€/Monat</div>
              </div>
            </button>
          </div>
        ) : (
          <form className="space-y-6">
            {selectedMethod === "email" && (
              <div className="space-y-4 rounded-lg border border-white/20 bg-white/5 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">E-Mail</h2>
                  <button
                    type="button"
                    onClick={() => setSelectedMethod(null)}
                    className="text-sm text-blue-300 hover:text-blue-400"
                  >
                    Andere Methode wählen
                  </button>
                </div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    className="h-4 w-4"
                    defaultChecked
                  />
                  <span>E-Mail Benachrichtigungen aktivieren</span>
                </label>
              </div>
            )}

            {selectedMethod === "telegram" && (
              <>
                <div className="space-y-4 rounded-lg border border-white/20 bg-white/5 p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Telegram</h2>
                    <button
                      type="button"
                      onClick={() => setSelectedMethod(null)}
                      className="text-sm text-blue-300 hover:text-blue-400"
                    >
                      Andere Methode wählen
                    </button>
                  </div>
                  <div>
                    <label className="mb-2 block text-lg">
                      Telegram Benutzername
                    </label>
                    <input
                      type="text"
                      name="telegramUsername"
                      placeholder="@benutzername"
                      className="w-full rounded-lg border border-white/20 bg-white/10 p-3 focus:border-blue-400 focus:outline-none"
                    />
                    <p className="mt-2 text-sm text-gray-300">
                      Ohne das @ Symbol eingeben
                    </p>
                  </div>
                </div>

                {/* Instructions for Telegram */}
                <div className="rounded-lg bg-white/10 p-6">
                  <h2 className="mb-4 text-xl font-semibold">
                    Nächste Schritte:
                  </h2>
                  <ol className="list-inside list-decimal space-y-2">
                    <li>Öffnen Sie Telegram</li>
                    <li>Suchen Sie nach unserem Bot: @OstseeWasserBot</li>
                    <li>Starten Sie den Bot mit dem /start Befehl</li>
                    <li>Sie erhalten eine Bestätigungsnachricht</li>
                  </ol>
                </div>
              </>
            )}

            <button
              formAction={setNotifications}
              type="submit"
              className="w-full rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold transition-colors hover:bg-blue-600"
            >
              Einrichtung abschließen
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
