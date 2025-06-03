import Link from "next/link";
import { createNotificationOTP } from "./actions/otp";
import { ClientNotificationsSetupPage } from "./client_page";

export default async function NotificationsSetupPage() {
  // Generate OTP during server-side rendering
  const initialOtp = await createNotificationOTP();

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#0066cc] to-[#001a33] text-white">
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/protected/signup_flow/warnings"
            className="text-sm text-gray-300 hover:text-white"
          >
            ← Zurück zu Warnungen
          </Link>
          <div className="text-sm text-gray-300">Schritt 2 von 2</div>
        </div>
        <ClientNotificationsSetupPage
          initialOtp={initialOtp}
          recreateOTP={createNotificationOTP}
        />
      </div>
    </main>
  );
}
