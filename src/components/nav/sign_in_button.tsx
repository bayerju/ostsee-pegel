import Link from "next/link";

export function SignInButton() {
  return (
    <Link
      href="/login"
      className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20"
    >
      Anmelden
    </Link>
  );
}
