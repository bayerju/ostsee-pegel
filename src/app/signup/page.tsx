"use client";

import Link from "next/link";
// import { resetPassword, signup } from "../auth/actions";
import { Button } from "~/components/ui/button";
import { z } from "zod";
import { useState } from "react";
// import { api } from "~/trpc/server";
import { api } from "~/trpc/react";
import { authClient } from "~/lib/auth-client";
import { useRouter } from "next/navigation";
export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  // const { isLoaded, signIn, setActive } = useSignIn();

  // if (!isLoaded) {
  //   return <div>Loading...</div>;
  // }

  // const signup = api.auth.signup.useMutation({
  //   onSuccess: async (data) => {
  //     const signInResult = await signIn?.create({
  //       strategy: "password",
  //       identifier: email,
  //       password: password,
  //     });
  //     await setActive({ session: signInResult?.createdSessionId });
  //     console.log(data);
  //   },
  // });

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
              id="email"
              className="w-full rounded-lg border border-white/20 bg-white/10 p-3 focus:border-blue-400 focus:outline-none"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {error && <p className="text-red-500">{error}</p>}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="flex justify-between">
              <p className="mt-2 text-sm text-gray-300">Mindestens 8 Zeichen</p>

              {/* <Button 
                onClick={async () => {
                  // const emailInput = document.getElementById('email') as HTMLInputElement;
                  const emailSchema = z.string().email("Ungültige E-Mail-Adresse");
                  
                  try {
                    const validatedEmail = emailSchema.parse("emailInput");
                    // resetPassword(validatedEmail);
                    await api.auth.resetPassword({ email: validatedEmail });
                  } catch (error) {
                    if (error instanceof z.ZodError) {
                      // alert("Bitte geben Sie eine gültige E-Mail-Adresse ein");
                    }
                  }
                }}
              >
                Passwort vergessen?
              </Button> */}
            </div>
          </div>

          {/* Submit Button */}
          <button
            // formAction={signup}
            type="submit"
            className="w-full rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold transition-colors hover:bg-blue-600"
            onClick={async () => {
              await authClient.signUp.email(
                {
                  email: email,
                  password: password,
                  name: "",
                },
                {
                  onRequest: (ctx) => {
                    setIsPending(true);
                    console.log("ctx", ctx);
                  },
                  onSuccess: (data) => {
                    setIsPending(false);
                    router.refresh();
                    router.push("/protected/signup_flow/warnings");
                    console.log("data", data);
                  },
                  onError: (error) => {
                    setError(error.error.message);
                    setIsPending(false);
                    console.log("error", error);
                  },
                },
              );
              // signup.mutate({ email, password });
            }}
            disabled={isPending}
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
