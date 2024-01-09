"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";
import { useSidebar } from "@/store/useSidebar";
import { Badge } from "../ui/badge";

type Props = {
    children: React.ReactNode;
    count: number;
    name: string;
    href: string;
};

export const NavItem = ({ children, count, name, href }: Props) => {
    const pathname = usePathname();
    const { isOpen } = useSidebar();
    const activeNav = href === pathname;
    const defaultStyles = cn(
        "relative px-4 py-3 font-extralight flex hover:bg-neutral-800 gap-x-4 items-center",
        activeNav && "bg-neutral-800 text-emerald-500"
    );

    return (
        <>
            {isOpen ? (
                <Link href={href} className={defaultStyles + " rounded-3xl"}>
                    <ItemWrapper
                        activeNav={activeNav}
                        count={count}
                        isOpen={isOpen}
                        name={name}>
                        {children}
                    </ItemWrapper>
                </Link>
            ) : (
                <Hint label={name} side="right" delayAmount={0} asChild>
                    <Link href={href} className={defaultStyles + " rounded-2xl"}>
                        {children}
                    </Link>
                </Hint>
            )}
        </>
    );
};

type ItemWrapperProps = {
    activeNav: boolean;
    children: React.ReactNode;
    count: number;
    isOpen: boolean;
    name: string;
};

const ItemWrapper = ({
    activeNav,
    children,
    count,
    isOpen,
    name,
}: ItemWrapperProps) => {
    return (
        <div className="flex justify-between w-full">
            <div className="flex justify-center items-center gap-x-3">
                {children}
                {isOpen && <div>{name}</div>}
            </div>
            {count > 0 && (
                <div className="relative">
                    <Badge variant={activeNav ? "active" : "secondary"}>{count}</Badge>
                </div>
            )}
        </div>
    );
};
