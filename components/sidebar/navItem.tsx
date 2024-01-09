"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";
import { useSidebar } from "@/store/useSidebar";
import { Badge } from "../ui/badge";

type Props = {
    children: React.ReactNode;
    count?: number;
    name: string;
    href: string;
};

export const NavItem = ({ children, count, name, href }: Props) => {
    const pathname = usePathname();
    const { isOpen } = useSidebar();
    const notificationCount = count && count > 0 ? count : 0
    const activeNav = href === pathname;
    const defaultStyles = cn(
        "relative px-4 py-3 font-extralight flex hover:bg-neutral-800 gap-x-4 items-center",
        activeNav && "bg-neutral-800 text-emerald-500"
    );

    return (
        <>
            {isOpen ? (
                <Link href={href} className={defaultStyles + " rounded-3xl"}>
                    <div className="flex justify-between w-full">
                        <div className="flex justify-center items-center gap-x-3">
                            {children}
                            {isOpen && <div>{name}</div>}
                        </div>
                        {notificationCount > 0 && (
                            <div className="relative">
                                <Badge className="rounded-xl" variant={activeNav ? "active" : "secondary"}>
                                    {count}
                                </Badge>
                            </div>
                        )}
                    </div>
                </Link>
            ) : (
                <Hint label={name} side="right" delayAmount={0} asChild>
                    <Link href={href} className={defaultStyles + " rounded-2xl"}>
                        <div className="relative">
                            {!!count && <Badge variant="notification">{notificationCount}</Badge>}
                            {children}
                        </div>
                    </Link>
                </Hint>
            )}
        </>
    );
};
