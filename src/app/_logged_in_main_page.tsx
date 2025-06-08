import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "~/lib/auth";

export async function LoggedInMainPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  console.log(session);
  if (!session?.user.id) {
    return null;
  }
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Willkommen zurück!</h1>

      <p className="mb-8 text-lg text-white/70">
        Hier sind ein paar Shortcuts für die wichtigsten Dinge.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/protected/settings"
          className="rounded-lg border border-white/20 bg-white/5 p-4 transition-colors hover:bg-white/10"
        >
          <h2 className="mb-2 font-semibold">Warnungen</h2>
          <p className="text-sm text-white/70">
            Hier kannst du deine Warnungen einstellen.
          </p>
        </Link>

        <Link
          href="/protected/notifications"
          className="rounded-lg border border-white/20 bg-white/5 p-4 transition-colors hover:bg-white/10"
        >
          <h2 className="mb-2 font-semibold">Benachrichtigungen</h2>
          <p className="text-sm text-white/70">
            Hier kannst du deine Benachrichtigungen einstellen.
          </p>
        </Link>
      </div>
    </div>
  );
}
