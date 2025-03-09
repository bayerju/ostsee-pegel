"use client";

import { useState, useTransition } from "react";
import { Button } from "~/components/ui/button";
import QRCode from "react-qr-code";
import Link from "next/link";

interface TelegramSetupProps {
  onBack: () => void;
  onSubmit: (formData: FormData) => void;
  initialOtp: string;
  recreateOTP: () => Promise<string>;
}

export function TelegramSetup({
  onBack,
  onSubmit,
  initialOtp,
  recreateOTP,
}: TelegramSetupProps) {
  const [telegramUsername, setTelegramUsername] = useState("");
  const [currentOtp, setCurrentOtp] = useState(initialOtp);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-4 rounded-lg border border-white/20 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Telegram</h2>
        <button
          type="button"
          onClick={onBack}
          className="rounded-full p-1 text-gray-400 hover:bg-white/10 hover:text-gray-300"
        >
          ✕
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6">
          <QRCode
            value={`https://t.me/WasserstandsWarnungBot?text=${currentOtp}`}
            className="h-48 w-48"
          />
          <Link
            href={`https://t.me/WasserstandsWarnungBot?text=${currentOtp}`}
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
        </ol>

        <div className="flex justify-end pt-4">
          <Link
            href="/"
            className="rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            Fertig
          </Link>
        </div>
      </div>
    </div>
  );
}
