"use client";

import { useRouter } from "next/navigation";
import { authClient } from "~/lib/auth-client";

export function SignOutButton() {
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
      className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20"
    >
      Abmelden
    </button>
  );
}
