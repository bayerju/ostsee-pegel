import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "~/lib/auth";

export async function LoggedInMainPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user.id) {
    return null;
  }
  return (
    <section className="mx-auto max-w-7xl px-6 pt-16 lg:px-10">
      <div className="rounded-3xl border border-[#dce8e5] bg-white p-7 shadow-[0_12px_40px_rgba(14,61,59,0.06)] sm:p-9">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#12302f]">
          Willkommen zurück!
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/protected/settings"
            className="rounded-2xl border border-[#dce8e5] bg-[#f5f9f8] p-5 text-[#12302f] transition-colors hover:bg-[#e3f2ef]"
          >
            <h3 className="mb-2 font-semibold">Meine Warnungseinstellungen</h3>
            <p className="text-sm text-[#5a716f]">
              Hier kannst du deine Warnungen einstellen.
            </p>
          </Link>

          <Link
            href="/protected/notifications"
            className="rounded-2xl border border-[#dce8e5] bg-[#f5f9f8] p-5 text-[#12302f] transition-colors hover:bg-[#e3f2ef]"
          >
            <h3 className="mb-2 font-semibold">
              Meine Benachrichtigungseinstellungen
            </h3>
            <p className="text-sm text-[#5a716f]">
              Hier kannst du deine Benachrichtigungen einstellen.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
