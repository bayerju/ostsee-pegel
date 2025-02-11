import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Link from "next/link";
import { createClient } from "~/utils/supabase/server";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Hochwasser-Warnung",
  description: "Einfach gewarnt werden bei Hochwasser und Niedrigwasser",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = cookies();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        {!user && (
          <nav className="absolute right-0 top-0 p-4">
            <Link
              href="/login"
              className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20"
            >
              Anmelden
            </Link>
          </nav>
        )}
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
