import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preise",
  description: "Kostenlose persönliche Warnungen für Ostsee-Wasserstände.",
  alternates: { canonical: "/pricing" },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
