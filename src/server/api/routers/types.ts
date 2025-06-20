import { type AppRouter } from "../root";


export type NotificationServices = Awaited<ReturnType<AppRouter["notifications"]["getNotificationServices"]>>