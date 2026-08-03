import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "sonner";

import { PostHogProvider } from "~/components/providers/posthog";
import { Nav } from "~/components/nav/nav";
import { Footer } from "~/components/footer/footer";
import { site } from "~/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ostsee Wasserstand aktuell | Ostsee Pegel",
    template: "%s | Ostsee Pegel",
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    title: "Ostsee Wasserstand aktuell | Ostsee Pegel",
    description: site.description,
  },
  twitter: {
    card: "summary",
    title: "Ostsee Wasserstand aktuell | Ostsee Pegel",
    description: site.description,
  },
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
    <html lang="de" className={`${GeistSans.variable}`}>
      <body className="mx-2 flex min-h-screen flex-col bg-gradient-to-b from-[hsl(210,100%,40%)] to-[#001a33] text-white">
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
