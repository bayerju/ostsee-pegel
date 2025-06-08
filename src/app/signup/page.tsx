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
import { PasswordInput } from "~/components/ui/inputs/password_input";
import { Input } from "~/components/ui/inputs/input";
export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
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
    <main className="flex min-h-screen flex-col items-center">
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <Link
          href="/"
          className="mb-8 inline-block text-blue-300 hover:text-blue-400"
        >
          ← Zurück zur Startseite
        </Link>

        <h1 className="mb-8 text-3xl font-bold">Konto erstellen</h1>

        <form className="flex flex-col gap-4 space-y-6">
          {/* Name */}
          <div>
            <label className="mb-2 block text-lg">Name</label>
            <Input
              type="text"
              name="name"
              id="name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          {/* Email */}
          <div>
            <label className="mb-2 block text-lg">E-Mail Adresse</label>
            <Input
              type="email"
              name="email"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-lg">Passwort</label>
            <PasswordInput
              name="password"
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
          <div>
            <label className="mb-2 block text-lg" htmlFor="password-confirm">
              Passwort bestätigen
            </label>
            <PasswordInput
              name="password-confirm"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            {password !== confirmPassword ? (
              <p className="text-red-500">Passwörter stimmen nicht überein</p>
            ) : (
              <p className="invisible text-green-500">
                Passwörter stimmen überein
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            // formAction={signup}
            // disabled={isPending || !name || !email || !password || !confirmPassword}
            type="submit"
            className="w-full rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold transition-colors hover:bg-blue-600"
            onClick={async () => {
              await authClient.signUp.email(
                {
                  email: email,
                  password: password,
                  name: name,
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
            disabled={
              isPending ||
              !name ||
              !email ||
              !password ||
              !confirmPassword ||
              password !== confirmPassword
            }
          >
            Weiter
          </Button>

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
