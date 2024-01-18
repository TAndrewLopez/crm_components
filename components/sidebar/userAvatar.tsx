"use client";

import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/useSidebar";

const avatarSizes = cva("", {
    variants: {
        size: {
            sm: "h-8 w-8",
            default: "h-10 w-10",
            md: "h-12 w-12",
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

export const UserAvatar = ({ imageURL, username, size }: Props) => {
    const { isOpen } = useSidebar();

    return (
        <div
            className={cn(
                "relative w-full flex items-center",
                isOpen ? "justify-between p-4" : "justify-center"
            )}>
            <p className={cn("", isOpen ? "block" : "hidden")}>
                {username}
            </p>
            <div className={cn("bg-neutral-800 flex items-center justify-center rounded-full", avatarSizes({ size }))}>
                {username[0].toUpperCase()}
                {username[1].toUpperCase()}
            </div>
        </div>
    );
};
