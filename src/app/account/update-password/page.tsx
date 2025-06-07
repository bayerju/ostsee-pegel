"use client";
import { api } from "~/trpc/react";
import { useState } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { authClient } from "~/lib/auth-client";

export default function UpdatePasswordPage() {
  // const updatePassword = api.auth.changePassword.useMutation({
  //   onSuccess: () => {
  //     toast.success("Passwort erfolgreich geändert");
  //     console.log("Passwort erfolgreich geändert");
  //   },
  // });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#0066cc] to-[#001a33] text-white">
      <div className="container mx-auto max-w-md px-4 py-16">
        <h1 className="mb-8 text-3xl font-bold">Passwort ändern</h1>

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
            <label className="mb-2 block text-lg">
              Neues Passwort bestätigen
            </label>
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
            onClick={async () => {
              const token = new URLSearchParams(window.location.search).get(
                "token",
              );
              // const error = INVALID_TOKEN
              const tokenError = new URLSearchParams(window.location.search).get(
                "error",
              );
              if (!token) {
                toast.error("Kein Token gefunden");
                return;
              }
              if (tokenError === "INVALID_TOKEN") {
                toast.error("Ungültiger Link. Der Link ist abgelaufen oder ungültig. Bedenke, dass er nur einmal verwendet werden kann.");
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
                  onSuccess: async (data) => {
                    console.log("sendForgetPassword success", data);
                    // await authClient.signIn.email({
                    //   email: data.email,
                    //   password: password,
                    // });
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
            disabled={isLoading}
          >
            Passwort ändern
          </button>
        </form>
      </div>
    </main>
  );
}
