import { ClientNotificationsSetupPage } from "../signup_flow/notifications/client_page";
import { createNotificationOTP } from "../signup_flow/notifications/actions/otp";

export default async function NotificationsPage() {
  const initialOtp = await createNotificationOTP();
  return (
    <ClientNotificationsSetupPage
      initialOtp={initialOtp}
      recreateOTP={createNotificationOTP}
    />
  );
}
