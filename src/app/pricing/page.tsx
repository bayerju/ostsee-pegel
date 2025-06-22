"use client";

import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Preise</h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-300">
          Bleiben Sie über Hochwasser- und Niedrigwasser-Warnungen informiert
        </p>
      </div>

      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-sm">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">Kostenlos</h2>
            <p className="text-gray-300">Kostenlos verfügbar</p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
              <span>Unbegrenzte Warnungen</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
              <span>E-Mail Benachrichtigungen</span>
              <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-300">
                Bald verfügbar
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
              <span>WhatsApp Benachrichtigungen</span>
              <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-300">
                Bald verfügbar
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
              <span>Signal Benachrichtigungen</span>
              <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-300">
                Bald verfügbar
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
              <span>SMS Benachrichtigungen</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
              <span>Telegram Benachrichtigungen</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
              <span>Personalisierte Warnschwellen</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
              <span>24/7 Überwachung</span>
            </div>
          </div>

          <div className="text-center">
            <p className="mb-4 text-lg font-semibold">
              Die Anmeldung ist vollständig kostenlos
            </p>
            <p className="text-sm text-gray-300">
              Keine versteckten Kosten. Keine Abonnement-Gebühren. Kostenlos
              verfügbar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
