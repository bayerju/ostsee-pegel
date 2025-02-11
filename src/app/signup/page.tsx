import Link from "next/link";
import { signup } from "../auth/actions";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#0066cc] to-[#001a33] text-white">
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <Link
          href="/"
          className="mb-8 inline-block text-blue-300 hover:text-blue-400"
        >
          ← Zurück zur Startseite
        </Link>

        <h1 className="mb-8 text-3xl font-bold">Konto erstellen</h1>

        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="mb-2 block text-lg">E-Mail Adresse</label>
            <input
              type="email"
              name="email"
              className="w-full rounded-lg border border-white/20 bg-white/10 p-3 focus:border-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-lg">Passwort</label>
            <input
              type="password"
              name="password"
              className="w-full rounded-lg border border-white/20 bg-white/10 p-3 focus:border-blue-400 focus:outline-none"
              required
              minLength={8}
            />
            <p className="mt-2 text-sm text-gray-300">Mindestens 8 Zeichen</p>
          </div>

          {/* Submit Button */}
          <button
            formAction={signup}
            type="submit"
            className="w-full rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold transition-colors hover:bg-blue-600"
          >
            Weiter
          </button>

          {/* Alternative Sign-up Methods */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#001a33] px-2 text-gray-300">
                Oder fortfahren mit
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/5 px-3 py-2 hover:bg-white/10"
            >
              <img src="/google.svg" alt="Google" className="h-5 w-5" />
              Google
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/5 px-3 py-2 hover:bg-white/10"
            >
              <img src="/apple.svg" alt="Apple" className="h-5 w-5" />
              Apple
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Bereits registriert?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300">
              Hier anmelden
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
