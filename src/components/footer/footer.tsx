import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#062d33] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/ostsee-pegel.svg" alt="" width={36} height={36} />
          <span>
            <span className="block font-semibold">Ostsee-Pegel</span>
            <span className="block text-xs text-white/50">
              Kostenlose Wasserstandswarnungen
            </span>
          </span>
        </Link>
        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/60">
          <Link href="/#so-funktionierts" className="hover:text-white">
            So funktioniert’s
          </Link>
          <Link href="/faq" className="hover:text-white">
            FAQ
          </Link>
          <Link href="/imprint" className="hover:text-white">
            Impressum
          </Link>
          <Link href="/privacy-policy" className="hover:text-white">
            Datenschutz
          </Link>
        </nav>
      </div>
    </footer>
  );
}
