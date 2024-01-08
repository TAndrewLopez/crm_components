"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type Props = {
    children: React.ReactNode,
    href: string;
}

export const NavLink = ({ children, href }: Props) => {
    const pathname = usePathname();
    return (
        <Link
            href={href}
            className={cn(
                "px-4 py-3 font-extralight hover:bg-neutral-800 hover:rounded-2xl flex gap-x-4 items-center cursor-pointer",
                href === pathname && "bg-neutral-800 rounded-2xl"
            )}>
            {children}
        </Link>
    );
};
