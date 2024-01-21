import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/60",
        primary: "border-transparent bg-emerald-500 text-primary-foreground",
        highlight: "border-transparent bg-amber-300 text-primary-foreground",
        secondary: "border-transparent bg-secondary text-primary-foreground",
        destructive: "border-transparent bg-destructive text-primary",
        grey: "border-transparent bg-neutral-500 text-primary",
        outline: "border-2 border-white text-foreground",
        outlinePrimary: "border-2 border-emerald-500 text-emerald-500 py-2.5 sm:py-0.5",
        invisible: "border-transparent w-6 h-6 font-normal",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
