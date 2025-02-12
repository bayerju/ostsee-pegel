import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Link from "next/link";
import { createClient } from "~/lib/supabase/server";

import { TRPCReactProvider } from "~/trpc/react";
import { signOut } from "~/app/auth/actions";

export const metadata: Metadata = {
  title: "Hochwasser-Warnung",
  description: "Einfach gewarnt werden bei Hochwasser und Niedrigwasser",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <nav className="absolute left-0 top-0 flex items-center gap-4 p-4">
          <Link
            href="/"
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
          >
            <img src="/icon.webp" alt="Home" className="h-6 w-6" />
          </Link>
        </nav>
        <nav className="absolute right-0 top-0 p-4">
          {user ? (
            <form action={signOut}>
              <button className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20">
                Abmelden
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20"
            >
              Anmelden
            </Link>
          )}
        </nav>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
