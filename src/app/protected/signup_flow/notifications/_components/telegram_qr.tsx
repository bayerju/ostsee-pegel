"use client";

import Link from "next/link";
import { env } from "~/env";
import QRCode from "react-qr-code";
import useIsMobile from "~/lib/hooks/use_is_mobile";
import { useState } from "react";

const botName =
  env.NEXT_PUBLIC_ENV === "production"
    ? "WasserstandsWarnungBot"
    : "ostseepegeldevBot";

export function TelegramQR({
  initialOtp,
  recreateOTP,
}: {
  initialOtp: string;
  recreateOTP: () => Promise<string>;
}) {
  const [currentOtp, setCurrentOtp] = useState(initialOtp);
  const isMobile = useIsMobile();
  const [showQRCode, setShowQRCode] = useState(!isMobile);

  return (
    <div className="flex flex-col items-center rounded-lg p-6">
      <div className="flex w-full justify-between gap-2">
        <button
          onClick={() => setShowQRCode(true)}
          className={`w-1/2 rounded-tl-2xl py-2 ${showQRCode ? "border-t text-white" : "text-gray-300"}`}
        >
          QRCode
        </button>
        <button
          onClick={() => setShowQRCode(false)}
          className={`w-1/2 rounded-tr-2xl py-2 ${!showQRCode ? "border-t text-white" : "text-gray-300"}`}
        >
          Link
        </button>
      </div>
      <div className="flex w-full items-center justify-center rounded-lg bg-white p-6">
        {showQRCode ? (
          <QRCode
            value={`https://t.me/${botName}?text=${currentOtp}`}
            className="h-48 w-48"
          />
        ) : (
          <Link
            href={`https://t.me/${botName}?text=${currentOtp}`}
            className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50 hover:underline"
          >
            Öffne den Link mit Telegram
          </Link>
        )}
      </div>
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
  );
}
