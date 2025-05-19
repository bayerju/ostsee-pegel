"use client";

import type { Session, User } from "better-auth";
import {
  ChevronsUpDown,
  LogInIcon,
  LogOutIcon,
  PlusCircleIcon,
  SettingsIcon,
  UserRoundPlus,
} from "lucide-react";
import {
  Fragment,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// import { AuthUIContext } from "~/lib/auth-ui-provider";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { UserAvatar } from "~/components/auth/user-avatar";
import { UserView, type UserViewClassNames } from "~/components/auth/user-view";
import Link from "next/link";
import { authClient } from "~/lib/auth-client";
import { SignOutButton } from "~/components/nav/sign_out_button";

export interface UserButtonClassNames {
  base?: string;
  skeleton?: string;
  trigger?: {
    base?: string;
    user?: UserViewClassNames;
    skeleton?: string;
  };
  content?: {
    base?: string;
    user?: UserViewClassNames;
    menuItem?: string;
    separator?: string;
  };
}

export interface UserButtonProps {
  className?: string;
  classNames?: UserButtonClassNames;
  additionalLinks?: {
    href: string;
    icon?: ReactNode;
    label: ReactNode;
    signedIn?: boolean;
  }[];
  disableDefaultLinks?: boolean;
  /**
   * @default authLocalization
   * @remarks `AuthLocalization`
   */
  // localization?: AuthLocalization;
  /**
   * @default "icon"
   */
  size?: "icon" | "full";
}

type DeviceSession = {
  session: Session;
  user: User;
};

/**
 * Displays an interactive user button with dropdown menu functionality
 *
 * Renders a user interface element that can be displayed as either an icon or full button:
 * - Shows a user avatar or placeholder when in icon mode
 * - Displays user name and email with dropdown indicator in full mode
 * - Provides dropdown menu with authentication options (sign in/out, settings, etc.)
 * - Supports multi-session functionality for switching between accounts
 * - Can be customized with additional links and styling options
 */
export function UserButton({
  additionalLinks,
  disableDefaultLinks,
  // localization,
  size = "icon",
}: UserButtonProps) {
  const { data: sessionData, isPending: sessionPending } =
    authClient.useSession();
  console.log(sessionData);
  const user = sessionData?.user;
  const [activeSessionPending, setActiveSessionPending] = useState(false);

  const isPending = sessionPending || activeSessionPending;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild={size === "full"}
        className={cn(
          size === "icon" && "rounded-full",
        )}
      >
        <UserAvatar
          key={user?.image}
          isPending={isPending}
          user={user}
          // aria-label={localization.account}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn("max-w-64")}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className={cn("p-2")}>
          {user || isPending ? (
            <UserView user={user} isPending={isPending} />
          ) : (
            <div className="-my-1 text-xs text-muted-foreground">Account</div>
          )}
        </div>

        <DropdownMenuSeparator />

        {additionalLinks?.map(
          ({ href, icon, label, signedIn }, index) =>
            (signedIn === undefined ||
              (signedIn && !!sessionData) ||
              (!signedIn && !sessionData)) && (
              <Link key={index} href={href}>
                <DropdownMenuItem>
                  {icon}

                  {label}
                </DropdownMenuItem>
              </Link>
            ),
        )}

        {!user ? (
          <>
            <Link href={`/login`}>
              <DropdownMenuItem>
                <LogInIcon />
                <span>Anmelden</span>

                {/* {localization.signIn} */}
              </DropdownMenuItem>
            </Link>

            <Link href={`/signup`}>
              <DropdownMenuItem>
                <UserRoundPlus />

                <span>Registrieren</span>
              </DropdownMenuItem>
            </Link>
          </>
        ) : (
          <>
            {!disableDefaultLinks && (
              <Link href={`/account/settings`}>
                <DropdownMenuItem>
                  <SettingsIcon />
                  Einstellungen
                </DropdownMenuItem>
              </Link>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOutButton />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
