"use client";

// import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "~/lib/auth";
import { SignInButton } from "./sign_in_button";
import { SignOutButton } from "./sign_out_button";
import { authClient } from "~/lib/auth-client";

export function Nav() {
  //   const res = await auth.api.getSession({
  //     headers: await headers(),
  //   });
  const session = authClient.useSession();
  return (
    <nav className="absolute left-0 top-0 flex w-full items-center justify-between gap-4 p-4">
      <Link
        href="/"
        className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
      >
        <img src="/icon.webp" alt="Home" className="h-6 w-6" />
      </Link>
      {/* {res?.session?.userId ? <SignOutButton /> : <SignInButton />} */}
      {session?.data?.user ? <SignOutButton /> : <SignInButton />}
      {/* <SignedOut>
    <SignInButton />
    <SignUpButton />
  </SignedOut>
  <SignedIn>
    <UserButton />
  </SignedIn> */}
      {/* <SignedIn> */}
      {/* <form action={signOut}>
      <button className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20">
        Abmelden
      </button>
    </form> */}
      {/* <SignOutButton /> */}
      {/* </SignedIn>
  <SignedOut> */}
      {/* <Link
        href="/login"
        className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20"
      >
        Anmelden
      </Link> */}
      {/* </SignedOut> */}
    </nav>
  );
}
