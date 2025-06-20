"use client";

import { useState } from "react";
import { NotificationOption } from "./_components/NotificationOption";
import { EmailSetup } from "./_components/EmailSetup";
import { TelegramSetup } from "./_components/TelegramSetup";
import { api } from "~/trpc/react";
import { isNil } from "lodash";
import { SmsSetup } from "./_components/sms_setup";

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
  const { data: notificationServices, refetch: refetchNotificationService } =
    api.notifications.getNotificationServices.useQuery();
  const { mutate: updateTelegramService } =
    api.notifications.updateTelegramService.useMutation({
      onSettled: () => {
        void refetchNotificationService();
      },
    });

  if (!notificationServices) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="mb-8 text-2xl font-bold lg:text-3xl">
        Benachrichtigungsmethode auswählen
      </h1>

      <div className="space-y-4">
        <NotificationOption
          title="Telegram"
          description="Erhalten Sie sofortige Benachrichtigungen direkt in Telegram"
          onClick={() => setSelectedMethod("telegram")}
          isSelected={selectedMethod === "telegram"}
          isSetup={!isNil(notificationServices?.telegram?.id)}
          isActive={notificationServices?.telegram?.isActive}
        >
          <TelegramSetup
            isActive={!!notificationServices?.telegram?.isActive}
            notificationId={notificationServices?.telegram?.id}
            // onBack={() => setSelectedMethod(null)}
            onComplete={() => {
              setSelectedMethod(null);
              void refetchNotificationService();
            }}
            updateTelegramService={updateTelegramService}
            initialOtp={initialOtp}
            recreateOTP={recreateOTP}
            notificationServices={notificationServices}
          />
        </NotificationOption>
        <NotificationOption
          title="SMS"
          description="Erhalten Sie Benachrichtigungen per SMS"
          isSetup={!isNil(notificationServices?.sms?.id)}
          isActive={!!notificationServices?.sms?.isActive}
          onClick={() => setSelectedMethod("sms")}
          isSelected={selectedMethod === "sms"}
        >
          <SmsSetup
            notificationServices={notificationServices}
            refetchNotificationServices={refetchNotificationService}
            onCloseButtonClick={() => setSelectedMethod(null)}
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
      </div>
    </>
  );
}
