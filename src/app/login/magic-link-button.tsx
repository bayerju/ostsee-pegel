"use client";

import { cn } from "~/lib/utils";
import { authClient } from "~/lib/auth-client";
import { toast } from "sonner";

export function MagicLinkButton({ email, className }: { email: string, className?: string }) {

  return (
    <button
      onClick={() => authClient.signIn.magicLink({ email }, {
        onSuccess: (response) => {
          toast.success("Email Link gesendet");
          console.log("response", response);
        },
        onError: (error) => {
          toast.error("Fehler beim Senden des Email Links");
          console.log("error", error);
        },
      })}
      className={cn("flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20", className)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
      Mit Email Link anmelden
    </button>
  );
}
