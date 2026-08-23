import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Häufige Fragen",
  robots: { index: false, follow: true },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
