"use client";

import { useRouter } from "next/navigation";
import { authClient } from "~/lib/auth-client";
import { cn } from "~/lib/utils";

export function SignOutButton(props: { className?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.refresh();
              router.push("/");
            },
          },
        })
      }
      className={cn(
        "rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-black transition-colors hover:bg-white/20",
        props.className
      )}
    >
      Abmelden
    </button>
  );
}
