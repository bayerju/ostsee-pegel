"use client"
import { updatePassword } from "~/app/auth/actions";
import { api } from "~/trpc/react";
import { useState } from "react";
import router from "next/router";
import { redirect } from "next/navigation";
import { toast } from "sonner";
// import { createClient } from "~/lib/supabase/client";

export default function UpdatePasswordPage() {
    // const supa = createClient();
    const updatePassword = api.auth.changePassword.useMutation({
        onSuccess: () => {
            toast.success("Passwort erfolgreich geändert");
            console.log("Passwort erfolgreich geändert");
        }
    });
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#0066cc] to-[#001a33] text-white">
      <div className="container mx-auto max-w-md px-4 py-16">
        <h1 className="mb-8 text-3xl font-bold">Passwort ändern</h1>

        <form className="space-y-6">
          <div aria-live="polite" id="error-message" className="text-red-400 min-h-6">
            {/* Errors will be shown here by the form action */}
          </div>

          <div>
            <label className="mb-2 block text-lg">Neues Passwort</label>
            <input
              type="password"
              name="password"
              className="w-full rounded-lg border border-white/20 bg-white/10 p-3 focus:border-blue-400 focus:outline-none"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="mt-2 text-sm text-gray-300">Mindestens 8 Zeichen</p>
          </div>

          <div>
            <label className="mb-2 block text-lg">Neues Passwort bestätigen</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full rounded-lg border border-white/20 bg-white/10 p-3 focus:border-blue-400 focus:outline-none"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold transition-colors hover:bg-blue-600"
            onClick={() => updatePassword.mutateAsync({ password, confirmPassword })}
            disabled={updatePassword.isPending}
          >
            Passwort ändern
          </button>
        </form>
      </div>
    </main>
  );
}