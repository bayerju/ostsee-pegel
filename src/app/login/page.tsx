import { login, signup } from "../auth/actions";
import Link from "next/link";

export default function LoginPage() {
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     // TODO: Implement login logic
  //     console.log({ email, password });
  //   } catch (err) {
  //     setError("Ungültige E-Mail oder Passwort");
  //   }
  // };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#0066cc] to-[#001a33] text-white">
      <div className="container mx-auto max-w-md px-4 py-16">
        <Link
          href="/"
          className="mb-8 inline-block text-blue-300 hover:text-blue-400"
        >
          ← Zurück zur Startseite
        </Link>

        <h1 className="mb-8 text-3xl font-bold">Anmelden</h1>

        <form className="space-y-6">
          <div>
            <label className="mb-2 block text-lg">E-Mail Adresse</label>
            <input
              type="email"
              name="email"
              className="w-full rounded-lg border border-white/20 bg-white/10 p-3 focus:border-blue-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-lg">Passwort</label>
            <input
              type="password"
              name="password"
              className="w-full rounded-lg border border-white/20 bg-white/10 p-3 focus:border-blue-400 focus:outline-none"
              required
            />
          </div>

          <button
            formAction={signup}
            type="submit"
            className="w-full rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold transition-colors hover:bg-blue-600"
          >
            Anmelden
          </button>
        </form>

        <div className="mt-6 text-center">
          Noch kein Konto?{" "}
          <Link
            href="/auth/signup"
            className="text-blue-400 hover:text-blue-300"
          >
            Jetzt registrieren
          </Link>
        </div>
      </div>
    </main>
  );
}

// export default function LoginPage() {
//   return (
//     <form>
//       <label htmlFor="email">Email:</label>
//       <input id="email" name="email" type="email" required />
//       <label htmlFor="password">Password:</label>
//       <input id="password" name="password" type="password" required />
//       <button formAction={login}>Log in</button>
//       <button formAction={signup}>Sign up</button>
//     </form>
//   )
// }
