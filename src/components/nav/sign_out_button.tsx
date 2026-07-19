"use client";

import { LogOutIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { authClient } from "~/lib/auth-client";
import { cn } from "~/lib/utils";

export function SignOutButton(props: { className?: string }) {
  const [isPending, setIsPending] = useState(false);

  const handleSignOut = async () => {
    setIsPending(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        throw new Error(result.error.message ?? "Sign-out failed");
      }

      window.location.assign("/");
    } catch (error) {
      console.error("Abmelden fehlgeschlagen:", error);
      toast.error("Abmelden fehlgeschlagen. Bitte versuche es erneut.");
      setIsPending(false);
    }
  };

  return (
    <DropdownMenuItem
      disabled={isPending}
      onSelect={(event) => {
        event.preventDefault();
        void handleSignOut();
      }}
      className={cn(
        "cursor-pointer text-red-700 focus:bg-red-50 focus:text-red-800",
        props.className,
      )}
    >
      <LogOutIcon />
      <span>{isPending ? "Wird abgemeldet …" : "Abmelden"}</span>
    </DropdownMenuItem>
  );
}
