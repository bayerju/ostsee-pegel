"use client";
import { useActionState } from "react";
import { updatePassword } from "~/app/auth/actions";
import { Button } from "~/components/ui/button";

export default function UpdatePasswordForm() {
    const [state, formAction, pending] = useActionState(updatePassword, { error: "" });
    console.debug("state", state);
    return (
        <form className="space-y-6" action={formAction}>
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
            />
            <p> {state.error}</p>
          </div>

          <Button
            type="submit"
            className="w-full rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold transition-colors hover:bg-blue-600"
            disabled={pending}
          >
            Passwort ändern
          </Button>
        </form>
    )
}