"use client";

import * as React from "react";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { cn } from "~/lib/utils";

export type MenuItem = {
  title: string;
  href?: string;
  submenu?: MenuItem[];
};

const MenuItemComponent: React.FC<{
  item: MenuItem;
  depth?: number;
  onNavigate: () => void;
}> = ({ item, depth = 0, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  if (item.submenu) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "flex w-full items-center justify-between py-2 text-lg font-medium transition-colors",
              depth > 0 && "pl-4",
            )}
          >
            {item.title}
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {item.submenu.map((subItem) => (
            <MenuItemComponent
              key={subItem.title}
              item={subItem}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <a
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "block rounded-xl px-4 py-3 text-base font-medium text-white/75 transition-colors hover:bg-white/[0.08] hover:text-white",
        depth > 0 && "pl-4",
      )}
    >
      {item.title}
    </a>
  );
};

export default function HamburgerMenu({
  menuItems,
}: {
  menuItems: MenuItem[];
}) {
  const [open, setOpen] = React.useState(false);
  const mobileMenuItems = [
    { title: "Startseite", href: "/" },
    ...menuItems.filter((item) => item.href !== "/"),
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="p-0 md:hidden [&_svg]:!size-8">
          <Menu />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[280px] border-white/10 bg-[#062d33] text-white sm:w-[320px] [&>button]:rounded-full [&>button]:p-1 [&>button]:text-white [&>button]:ring-offset-[#062d33] [&>button]:focus:ring-[#77d8cc] [&>button]:data-[state=open]:bg-white/10"
      >
        <SheetTitle className="border-b border-white/10 pb-5 text-left text-lg text-white">
          Ostsee-Pegel
        </SheetTitle>
        <nav className="mt-3 flex flex-col space-y-1">
          {mobileMenuItems.map((item) => (
            <MenuItemComponent
              key={item.title}
              item={item}
              onNavigate={() => setOpen(false)}
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
