import { submissionStatus } from "@prisma/client";

import { cn } from "@/lib/utils";

type Props = {
    size?: "sm" | "lg";
    status: submissionStatus;
};

export const StatusBadgeMobile = ({ size = "sm", status }: Props) => {
    switch (status) {
        case "closed":
            return (
                <div
                    className={cn(
                        "bg-neutral-500 rounded-full",
                        size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5"
                    )}
                />
            );
        case "current":
            return (
                <div
                    className={cn(
                        "border-2 border-emerald-500 rounded-full",
                        size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5"
                    )}
                />
            );
        case "new":
            return (
                <div
                    className={cn(
                        "bg-emerald-500 rounded-full",
                        size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5"
                    )}
                />
            );
        case "pending":
            return (
                <div
                    className={cn(
                        "border-2 border-amber-300 rounded-full",
                        size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5"
                    )}
                />
            );
        case "read":
            return (
                <div
                    className={cn(
                        "border-2 border-neutral-500 rounded-full",
                        size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5"
                    )}
                />
            );
        case "urgent":
            return (
                <div
                    className={cn(
                        "border-2 border-destructive rounded-full",
                        size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5"
                    )}
                />
            );
        default:
            return null;
    }
};
