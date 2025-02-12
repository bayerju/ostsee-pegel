"use client";

import { useState } from "react";
import { NotificationOption } from "./_components/NotificationOption";
import { EmailSetup } from "./_components/EmailSetup";
import { TelegramSetup } from "./_components/TelegramSetup";
import { setTelegram } from "~/app/notifications/actions";

type NotificationMethod = "email" | "telegram" | "whatsapp" | "sms" | null;

export function ClientNotificationsSetupPage({
  initialOtp,
  recreateOTP,
}: {
  initialOtp: string;
  recreateOTP: () => Promise<string>;
}) {
  const [selectedMethod, setSelectedMethod] =
    useState<NotificationMethod>(null);

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#0066cc] to-[#001a33] text-white">
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <div className="mb-8 flex items-center justify-end">
          <div className="text-sm text-gray-300">Schritt 2 von 2</div>
        </div>

        <h1 className="mb-8 text-3xl font-bold">
          Benachrichtigungsmethode auswählen
        </h1>

        {/* {!selectedMethod ? ( */}
        <div className="space-y-4">
          <NotificationOption
            title="E-Mail"
            description="Erhalten Sie detaillierte Benachrichtigungen per E-Mail"
            onClick={() => setSelectedMethod("email")}
            isSelected={selectedMethod === "email"}
          >
            <EmailSetup onBack={() => setSelectedMethod(null)} />
          </NotificationOption>

          <NotificationOption
            title="Telegram"
            description="Erhalten Sie sofortige Benachrichtigungen direkt in Telegram"
            onClick={() => setSelectedMethod("telegram")}
            isSelected={selectedMethod === "telegram"}
          >
            <TelegramSetup
              onBack={() => setSelectedMethod(null)}
              onSubmit={setTelegram}
              initialOtp={initialOtp}
              recreateOTP={recreateOTP}
            />
          </NotificationOption>

          <NotificationOption
            title="WhatsApp"
            description="Erhalten Sie Benachrichtigungen direkt in WhatsApp (Coming Soon)"
            isPremium
            price="2€/Monat"
            disabled
          />

          <NotificationOption
            title="SMS"
            description="Erhalten Sie Benachrichtigungen per SMS (Coming Soon)"
            isPremium
            price="3€/Monat"
            disabled
          />
        </div>
        {/* ) : (
          <form className="space-y-6">
            {selectedMethod === "email" && (
              <EmailSetup onBack={() => setSelectedMethod(null)} />
            )}
            {selectedMethod === "telegram" && (
              <TelegramSetup onBack={() => setSelectedMethod(null)} />
            )}

            <button
              formAction={setNotifications}
              type="submit"
              className="w-full rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold transition-colors hover:bg-blue-600"
            >
              Einrichtung abschließen
            </button>
          </form>
        )} */}
      </div>
    </main>
  );
}
