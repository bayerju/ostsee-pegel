"use client";

// import { login, resetPassword } from "../auth/actions";
import Link from "next/link";
import { useState } from "react";
import { tryCatch } from "~/lib/try-catch";
import { redirect, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { ForgotPasswordDialog } from "./forgot_password_dialog";
import { Input } from "~/components/ui/inputs/input";
import { authClient } from "~/lib/auth-client";
import { PasswordInput } from "~/components/ui/inputs/password_input";
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

  // const { isLoaded, signIn, setActive } = useSignIn();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [showPasswordResetDialog, setShowPasswordResetDialog] = useState(false);
  const router = useRouter();

  if (isPending) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="container mx-auto max-w-md px-4 py-16">
        <Link
          href="/"
          className="mb-8 inline-block text-blue-300 hover:text-blue-400"
        >
          ← Zurück zur Startseite
        </Link>

        <h1 className="mb-8 text-3xl font-bold">Anmelden</h1>
        <Dialog
          open={showPasswordResetDialog}
          onOpenChange={(state) => {
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur();
            }
            // setShowPasswordResetDialog(state);
            setTimeout(() => setShowPasswordResetDialog(state), 10);
          }}
        >
          <form className="space-y-6">
            <div>
              <label className="mb-2 block text-lg">E-Mail Adresse</label>
              <Input
                type="email"
                name="email"
                className="w-full rounded-lg border border-white/20 bg-white/10 p-3 focus:border-blue-400 focus:outline-none"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  // signIn.identifier = e.target.value;
                }}
                value={email}
              />
              <div className="min-h-6 text-red-400" id="error-message">
                {error}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-lg">Passwort</label>
              <PasswordInput
                type="password"
                name="password"
                className="w-full rounded-lg border border-white/20 bg-white/10 p-3 focus:border-blue-400 focus:outline-none"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <ForgotPasswordDialog email={email} />
            </div>

            <button
              // formAction={login}
              onClick={async (e) => {
                e.preventDefault(); // Prevent form submission
                setError(""); // Clear previous errors

                if (!email || !password) {
                  setError("Bitte füllen Sie alle Felder aus");
                  return;
                }
                await authClient.signIn.email(
                  {
                    email: email,
                    password: password,
                  },
                  {
                    onRequest: (ctx) => {
                      console.log(ctx);
                      setIsPending(true);
                    },
                    onSuccess: (data) => {
                      setIsPending(false);
                      router.push("/protected/settings");
                      router.refresh();
                      console.log(data);
                    },
                    onError: (error) => {
                      setIsPending(false);
                      setError(error.error.message);
                      console.log("error", error);
                    },
                    onResponse: (response) => {
                      console.log("response", response);
                    },
                  },
                );
              }}
              disabled={isPending}
              type="submit"
              className="w-full rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold transition-colors hover:bg-blue-600"
            >
              Anmelden
            </button>
          </form>
        </Dialog>

        <div className="mt-6 text-center">
          Noch kein Konto?{" "}
          <Link href="/signup" className="text-blue-400 hover:text-blue-300">
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
