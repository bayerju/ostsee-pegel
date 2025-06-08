import * as React from "react";

import { cn } from "~/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-base ring-offset-black file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-blue-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm [&:-webkit-autofill]:!bg-background [&:-webkit-autofill]:!bg-clip-padding [&:-webkit-autofill]:!text-foreground [&:-webkit-autofill]:!shadow-[0_0_0_1000px_hsl(var(--input))_inset]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
