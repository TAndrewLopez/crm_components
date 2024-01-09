"use client";

import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/useSidebar";

const avatarSizes = cva("", {
    variants: {
        size: {
            default: "h-8 w-8",
            lg: "h-14 w-14",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

interface Props extends VariantProps<typeof avatarSizes> {
    imageURL: string;
    username: string;
}

export const UserAvatar = ({ imageURL, username }: Props) => {
    const { isOpen } = useSidebar();

    return (
        <div
            className={cn(
                "relative w-full flex items-center",
                isOpen ? "justify-between" : "justify-center"
            )}>
            <p className={cn("", isOpen ? "block" : "hidden")}>
                {username}
            </p>
            <div className="bg-neutral-800 p-3 rounded-full">
                {'A'}
                {'D'}
            </div>
        </div>
    );
};
