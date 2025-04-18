"use client";

import { useState } from "react";
import { NotificationOption } from "./_components/NotificationOption";
import { EmailSetup } from "./_components/EmailSetup";
import { TelegramSetup } from "./_components/TelegramSetup";

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
            title="Telegram"
            description="Erhalten Sie sofortige Benachrichtigungen direkt in Telegram"
            onClick={() => setSelectedMethod("telegram")}
            isSelected={selectedMethod === "telegram"}
          >
            <TelegramSetup
              onBack={() => setSelectedMethod(null)}
              initialOtp={initialOtp}
              recreateOTP={recreateOTP}
            />
          </NotificationOption>
          <NotificationOption
            title="E-Mail"
            description="Erhalten Sie detaillierte Benachrichtigungen per E-Mail"
            onClick={() => setSelectedMethod("email")}
            isSelected={selectedMethod === "email"}
            comingSoon
          >
            <EmailSetup onBack={() => setSelectedMethod(null)} />
          </NotificationOption>

          <NotificationOption
            title="WhatsApp"
            description="Erhalten Sie Benachrichtigungen direkt in WhatsApp"
            isPremium
            price="2€/Monat"
            disabled
            comingSoon
          />

          <NotificationOption
            title="SMS"
            description="Erhalten Sie Benachrichtigungen per SMS"
            isPremium
            price="3€/Monat"
            disabled
            comingSoon
          />
        </div>
      </div>
    </main>
  );
}
