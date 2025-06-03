"use client";

import { useState } from "react";
import { NotificationOption } from "./_components/NotificationOption";
import { EmailSetup } from "./_components/EmailSetup";
import { TelegramSetup } from "./_components/TelegramSetup";
import { api } from "~/trpc/react";
import { isNil } from "lodash";

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
  const { data: notificationService, refetch } =
    api.notifications.getActiveNotificationService.useQuery();
  const { mutate: updateTelegramService } =
    api.notifications.updateTelegramService.useMutation({
      onSettled: () => {
        void refetch();
      },
    });

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">
        Benachrichtigungsmethode auswählen
      </h1>

      <div className="space-y-4">
        <NotificationOption
          title="Telegram"
          description="Erhalten Sie sofortige Benachrichtigungen direkt in Telegram"
          onClick={() => setSelectedMethod("telegram")}
          isSelected={selectedMethod === "telegram"}
          isSetup={!isNil(notificationService?.id)}
          isActive={notificationService?.service === "telegram"}
        >
          <TelegramSetup
            isActive={notificationService?.service === "telegram"}
            notificationId={notificationService?.id}
            // onBack={() => setSelectedMethod(null)}
            onComplete={() => {
              setSelectedMethod(null);
              void refetch();
            }}
            updateTelegramService={updateTelegramService}
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
          isActive={false}
          disabled
          comingSoon
        />

        <NotificationOption
          title="SMS"
          description="Erhalten Sie Benachrichtigungen per SMS"
          isActive={false}
          disabled
          comingSoon
        />
      </div>
    </>
  );
}
