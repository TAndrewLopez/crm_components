'use client'

import Link from "next/link";
import { Hint } from "../hint";
import { NavLink } from "./navLink";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
    children: React.ReactNode;
    count?: number;
    name: string;
    href: string;
};

export const NavItem = ({ children, count, name, href }: Props) => {
    const pathname = usePathname()
    return (
        <>
            <Hint label={name} side="right" asChild>
                <Link
                    href={href}
                    className={cn("px-4 py-3 font-extralight hover:bg-neutral-800 hover:rounded-2xl flex gap-x-4 items-center cursor-pointer",
                        href === pathname && 'bg-neutral-800 rounded-2xl')}>
                    {children}
                </Link>
            </Hint>
        </>
    );
};
