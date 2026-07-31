import Link from "next/link";

export function SignInButton() {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link
        href="/login"
        className="inline-flex whitespace-nowrap rounded-full border border-white/25 bg-white/[0.06] px-3 py-2 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10"
      >
        Anmelden
      </Link>
      <Link
        href="/signup"
        className="whitespace-nowrap rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#123638] transition-colors hover:bg-[#dff4f0] sm:px-5"
      >
        <span className="sm:hidden">Einrichten</span>
        <span className="hidden sm:inline">Warnung einrichten</span>
      </Link>
    </div>
  );
}
