"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";
import { useSidebar } from "@/store/useSidebar";
import { NotificationBadge } from "../notificationBadge";

type Props = {
    children: React.ReactNode;
    count?: number;
    name: string;
    href: string;
};

export const NavItem = ({ children, count, name, href }: Props) => {
    const pathname = usePathname();
    const { isOpen } = useSidebar();
    const notificationCount = count && count > 0 ? count : 0;

    const pathArr = pathname.split('/')
    const hrefArr = href.split("/")

    const activeNav = href === pathname || pathArr.includes(hrefArr[hrefArr.length - 1]) && href !== '/'
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
                            {isOpen && <p>{name}</p>}
                        </div>

                        {notificationCount > 0 && (
                            <div className="relative">
                                <NotificationBadge
                                    className="rounded-xl"
                                    variant={activeNav ? "active" : "default"}>
                                    {count}
                                </NotificationBadge>
                            </div>
                        )}
                    </div>
                </Link>
            ) : (
                <Hint label={name} side="right" delayAmount={0} asChild>
                    <Link href={href} className={defaultStyles + " rounded-2xl"}>
                        <div className="relative">
                            {!!count && (
                                <NotificationBadge variant="notification">{notificationCount}</NotificationBadge>
                            )}
                            {children}
                        </div>
                    </Link>
                </Hint>
            )}
        </>
    );
};
