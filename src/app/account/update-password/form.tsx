"use client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
// import { updatePassword } from "~/app/auth/actions";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";
// import { api } from "~/trpc/react";

export default function UpdatePasswordForm() {
  // const [state, formAction, pending] = useActionState(updatePassword, { error: "" });
  // const updatePassword = api.auth.changePassword.useMutation({
  //   onSuccess: () => {
  //     toast.success("Passwort erfolgreich geändert");
  //     redirect("/protected/settings");
  //   },

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  return (
    <form className="space-y-6">
      <div
        aria-live="polite"
        id="error-message"
        className="min-h-6 text-red-400"
      >
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
        <p> {error}</p>
      </div>

      <Button
        type="button"
        className="w-full rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold transition-colors hover:bg-blue-600"
        disabled={isLoading}
        onClick={async () => {
          const token = new URLSearchParams(window.location.search).get(
            "token",
          );
          if (!token) {
            toast.error("Kein Token gefunden");
            return;
          }
          if (password !== confirmPassword) {
            toast.error("Passwörter stimmen nicht überein");
            return;
          }
          const { data, error } = await authClient.resetPassword(
            {
              newPassword: password,
              token: token,
            },
            {
              onRequest: (ctx) => {
                console.log("sendForgetPassword request", ctx);
                setIsLoading(true);
              },
              onSuccess: (data) => {
                console.log("sendForgetPassword success", data);
                setIsLoading(false);
                redirect("/protected/settings");
              },
              onError: (error) => {
                console.log("sendForgetPassword error", error);
                setIsLoading(false);
                setError(error.error.message);
              },
            },
          );
          console.log("data", data);
          console.log("error", error);
          if (error) {
            toast.error(error.message);
            return;
          }
          toast.success("Passwort erfolgreich geändert");
          redirect("/protected/settings");

          // updatePassword.mutate({
          //   password: "test",
          //   confirmPassword: "test",
          // });
        }}
      >
        Passwort ändern
      </Button>
    </form>
  );
}
