import { createNotificationOTP } from "./actions/otp";
import { ClientNotificationsSetupPage } from "./client_page";

export default async function NotificationsSetupPage() {
  // Generate OTP during server-side rendering
  const initialOtp = await createNotificationOTP();

  return (
    <ClientNotificationsSetupPage
      initialOtp={initialOtp}
      recreateOTP={createNotificationOTP}
    />
  );
}
