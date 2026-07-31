"use client";

import Image from "next/image";
import Link from "next/link";
import { SignInButton } from "./sign_in_button";
import { authClient } from "~/lib/auth-client";
import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "~/components/ui/navigation-menu";
import HamburgerMenu from "~/components/ui/mobile-nav";
import { UserButton } from "../auth/user-button";

const menuItems = [
  { title: "So funktioniert's", href: "/#so-funktionierts" },
  { title: "Regionen", href: "/#regionen" },
  { title: "Warum kostenlos?", href: "/#warum-kostenlos" },
];

export function Nav() {
  const session = authClient.useSession();
  return (
    // <div>
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#062d33]/90 text-white backdrop-blur-xl">
      <div className="h-18 mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <NavigationMenu className="hidden max-w-none flex-1 lg:flex lg:justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg transition-opacity hover:opacity-80"
          >
            <Image
              src="/ostsee-pegel.svg"
              alt=""
              width={36}
              height={36}
              priority
            />
            <span className="font-semibold tracking-[-0.02em]">
              Ostsee-Pegel
            </span>
          </Link>
          <div>
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    className="group inline-flex h-10 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white focus:outline-none"
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

        {session?.data?.user ? <UserButton /> : <SignInButton />}
      </div>
    </header>
  );
}
