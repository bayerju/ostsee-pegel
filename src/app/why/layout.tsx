import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warum Ostsee Pegel?",
  robots: { index: false, follow: true },
};

export default function WhyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
