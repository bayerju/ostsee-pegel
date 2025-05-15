"use client";

import Link from "next/link";
import { SignInButton } from "./sign_in_button";
import { SignOutButton } from "./sign_out_button";
import { authClient } from "~/lib/auth-client";
import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "~/components/ui/navigation-menu";
import HamburgerMenu from "~/components/ui/mobile-nav";

const menuItems = [
  { title: "Home", href: "/" },
  { title: "Preise", href: "/pricing" },
  { title: "FAQ", href: "/faq" },
];

export function Nav() {
  const session = authClient.useSession();
  return (
    // <div>
    <div className="left-0 top-0 flex w-full items-center justify-between gap-4 p-4">
      <NavigationMenu className="hidden w-full md:flex md:justify-between">
        <Link
          href="/"
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-accent/10"
        >
          <img src="/icon.webp" alt="Home" className="h-6 w-6" />
        </Link>
        <div className="w-full">
          <NavigationMenuList>
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/10 hover:text-foreground focus:bg-accent/10 focus:text-foreground focus:outline-none"
                  href={item.href}
                >
                  {item.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </div>
      </NavigationMenu>
      <HamburgerMenu menuItems={menuItems} />

      {session?.data?.user ? <SignOutButton /> : <SignInButton />}
    </div>
  );
}
