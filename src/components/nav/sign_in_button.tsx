import Link from "next/link";

export function SignInButton() {
  const className =
    "rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20";
  return (
    <div className="flex gap-4">
      <Link href="/signup" className={className}>
        Registrieren
      </Link>
      <Link href="/login" className={className}>
        Anmelden
      </Link>
    </div>
  );
}
