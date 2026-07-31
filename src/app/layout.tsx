import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "sonner";

import { PostHogProvider } from "~/components/providers/posthog";
import { Nav } from "~/components/nav/nav";
import { Footer } from "~/components/footer/footer";

export const metadata: Metadata = {
  title: "Ostsee-Pegel – Kostenlose Hochwasser-Warnungen",
  description:
    "Kostenlose, persönliche Warnungen bei kritischen Wasserständen an der Ostsee.",
  icons: {
    icon: [
      { url: "/ostsee-pegel.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  return (
    <html lang="de" className={`${GeistSans.variable}`}>
      <body className="flex min-h-screen flex-col bg-[#062d33] text-white antialiased">
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
          <TRPCReactProvider>
            <div className="min-h-screen flex-1">
              <Nav />
              {children}
            </div>
            <Footer />
          </TRPCReactProvider>
          <Toaster />
        </PostHogProvider>
      </body>
    </html>
  );
}
