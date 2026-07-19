import Link from "next/link";

export function SignInButton() {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link
        href="/login"
        className="hidden rounded-full px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white sm:inline-flex"
      >
        Anmelden
      </Link>
      <Link
        href="/signup"
        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#123638] transition-colors hover:bg-[#dff4f0] sm:px-5"
      >
        Warnung einrichten
      </Link>
    </div>
  );
}
