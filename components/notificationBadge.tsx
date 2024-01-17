import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const notificationBadgeVariants = cva(
    "w-6 h-6 inline-flex items-center justify-center border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent px-4 bg-secondary text-secondary-foreground",
                active: "text-emerald-500",
                notification:
                    "absolute -top-5 -end-2.5 border-transparent rounded-full bg-emerald-500 text-primary",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationBadgeVariants> { }

function NotificationBadge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(notificationBadgeVariants({ variant }), className)} {...props} />
    );
}

export { NotificationBadge, notificationBadgeVariants };
