"use client";

import { api } from "~/trpc/react";
import { useState } from "react";
import { Input } from "~/components/ui/inputs/input";
import { InputPhone } from "~/components/ui/inputs/input_phone";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { toast } from "sonner";
import { type NotificationServices } from "~/server/api/routers/types";

export function SmsSetup({
  notificationServices,
  refetchNotificationServices,
  onCloseButtonClick,
}: {
  notificationServices: NotificationServices;
  refetchNotificationServices: () => void;
  onCloseButtonClick: () => void;
}) {
  const verifySmsMutation = api.notifications.verifySms.useMutation();
  const activateSmsMutation = api.notifications.activateSms.useMutation({
    onSuccess: () => {
      refetchNotificationServices();
    },
  });

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  return (
    
    <div className="space-y-4 rounded-lg border border-white/20 bg-white/5 p-6">
        <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">SMS</h2>
        <button
          type="button"
          onClick={onCloseButtonClick}
          className="rounded-full p-1 text-gray-400 hover:bg-white/10 hover:text-gray-300"
        >
          ✕
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone">Telefonnummer</label>
          <InputPhone setFullPhoneNumber={setPhone} />
        </div>
        <Button
          disabled={!phone || verifySmsMutation.isPending}
          onClick={() => verifySmsMutation.mutate({ to: phone })}
        >
          Verifizierungscode senden
        </Button>
      </div>
      <SmsCodeVerification
        refetchNotificationServices={refetchNotificationServices}
      />
      {notificationServices.sms?.isVerified &&
        !notificationServices.sms?.isActive && (
          <Button
            onClick={() => activateSmsMutation.mutate({ isActive: true })}
          >
            Aktivieren
          </Button>
        )}
      {notificationServices.sms?.isActive && (
        <Button
          disabled={activateSmsMutation.isPending}
          variant={"destructive"}
          onClick={() => activateSmsMutation.mutate({ isActive: false })}
        >
          Deaktivieren
        </Button>
      )}
    </div>
  );
}

function SmsCodeVerification({
  refetchNotificationServices,
}: {
  refetchNotificationServices: () => void;
}) {
  const verifySmsMutation = api.notifications.verifySmsCode.useMutation({
    onSuccess: () => {
      refetchNotificationServices();
      toast.success("Verifizierungscode erfolgreich");
    },
  });
  const [code, setCode] = useState("");
  return (
    <div className={cn("space-y-4")}>
      {/* return <div className={cn("space-y-4", !isActive && "opacity-50 pointer-events-none")}> */}
      <div className="flex flex-col gap-2">
        <label htmlFor="code">Verifizierungscode</label>
        <Input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <Button disabled={!code || verifySmsMutation.isPending} onClick={() => verifySmsMutation.mutate({ code: code })}>
        Verifizieren
      </Button>
    </div>
  );
}
