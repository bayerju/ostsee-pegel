import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "sonner";

import { PostHogProvider } from "~/components/providers/posthog";
import { ClerkProvider } from "@clerk/nextjs";
import { Nav } from "~/components/nav/nav";
// import {
//   ClerkProvider,
//   SignInButton,
//   // SignOutButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Hochwasser-Warnung",
  description: "Einfach gewarnt werden bei Hochwasser und Niedrigwasser",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <PostHogProvider>
            {/* <header className="flex h-16 items-center justify-end gap-4 p-4">
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header> */}
            <Nav />
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <Toaster />
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
