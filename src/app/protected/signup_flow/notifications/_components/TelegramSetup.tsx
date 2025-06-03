"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import QRCode from "react-qr-code";
import Link from "next/link";
import { env } from "~/env";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { isNil } from "lodash";
interface TelegramSetupProps {
  // onBack: () => void;
  initialOtp: string;
  recreateOTP: () => Promise<string>;
  isActive: boolean;
  onComplete: () => void;
  updateTelegramService: (data: { isActive: boolean }) => void;
  notificationId?: string;
}

export function TelegramSetup({
  // onBack,
  initialOtp,
  recreateOTP,
  isActive,
  onComplete,
  updateTelegramService,
  notificationId,
}: TelegramSetupProps) {
  const [currentOtp, setCurrentOtp] = useState(initialOtp);
  const botName =
    env.NEXT_PUBLIC_ENV === "production"
      ? "WasserstandsWarnungBot"
      : "ostseepegeldevBot";

  return (
    <div className="space-y-4 rounded-lg border border-white/20 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Telegram</h2>
        <button
          type="button"
          onClick={onComplete}
          className="rounded-full p-1 text-gray-400 hover:bg-white/10 hover:text-gray-300"
        >
          ✕
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6">
          <QRCode
            value={`https://t.me/${botName}?text=${currentOtp}`}
            className="h-48 w-48"
          />
          <Link
            href={`https://t.me/${botName}?text=${currentOtp}`}
            className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
          >
            Öffne den Link mit Telegram
          </Link>
          {/* <button
            onClick={() => {
              startTransition(async () => {
                const newOtp = await recreateOTP();
                setCurrentOtp(newOtp);
              });
            }}
            disabled={isPending}
            className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
          >
            {isPending ? "Wird aktualisiert..." : "QR-Code aktualisieren"}
          </button> */}
        </div>

        <ol className="space-y-3 text-sm">
          <li className="flex items-start gap-2">
            <span className="flex h-6 w-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm">
              1
            </span>
            Scanne den QR-Code oder öffne den Link mit Telegram
          </li>
          <li className="flex items-start gap-2">
            <span className="flex h-6 w-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm">
              2
            </span>
            Öffne den Link mit Telegram
          </li>
          <li className="flex items-start gap-2">
            <span className="flex h-6 w-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm">
              3
            </span>
            Starte den Bot mit dem Befehl /start
          </li>
          <li className="flex items-start gap-2">
            <span className="flex h-6 w-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm">
              4
            </span>
            Schicke den Bestätigungscode ab
          </li>
          <li className="flex items-start gap-2">
            <span className="flex h-6 w-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm">
              5
            </span>
            Erhalte eine Bestätigungsnachricht
          </li>
          <li className="flex items-start gap-2">
            <span className="flex h-6 w-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm">
              6
            </span>
            Wenn du die Seite jetzt neu lädst, sollten Benachrichtigungen über
            Telegram als aktiv angezeigt werden.
          </li>
        </ol>

        <div className="flex justify-end pt-4">
          {isNil(notificationId) ? (
            <Button variant="default" onClick={onComplete}>
              Fertig
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={`${isActive ? "destructive" : "default"}`}>
                  {isActive ? "Deaktivieren" : "Aktivieren"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {isActive ? "Deaktivieren" : "Aktivieren"}
                  </DialogTitle>
                  <DialogDescription>
                    {isActive
                      ? "Deaktiviere die Telegram-Benachrichtigung. Dann werden keine Benachrichtigungen mehr an dich gesendet."
                      : "Aktiviere die Telegram-Benachrichtigung. Dann werden Benachrichtigungen an dich gesendet."}
                  </DialogDescription>
                </DialogHeader>
                <Button
                  variant="destructive"
                  onClick={() => {
                    updateTelegramService({
                      isActive: false,
                    });
                    onComplete();
                  }}
                >
                  Deaktivieren
                </Button>
                <Button
                  variant="default"
                  onClick={() => {
                    updateTelegramService({
                      isActive: true,
                    });
                    onComplete();
                  }}
                >
                  Aktivieren
                </Button>
              </DialogContent>
              {/* {isActive ? (
            <Button
              variant="destructive"
              onClick={() => {
                updateTelegramService({
                  isActive: false,
                });
              }}
            >
              deactivate
            </Button>
          ) : (
            <Button
              onClick={() => {
                updateTelegramService({
                  isActive: true,
                });
              }}
            >
              activate
            </Button>
          )} */}
            </Dialog>
          )}

          {/* <Button
            onClick={onComplete}
            className="rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            Fertig
          </Button> */}
        </div>
      </div>
    </div>
  );
}
