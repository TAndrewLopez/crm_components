"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Hint } from "@/components/hint";
import { NotificationBadge } from "@/components/notificationBadge";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/useSidebar";

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

    const pathArr = pathname.split("/");
    const hrefArr = href.split("/");

    const activeNav =
        href === pathname ||
        (pathArr.includes(hrefArr[hrefArr.length - 1]) && href !== "/");



    // const currentPage = pathname === href;
    // if (activeNav) {

    //     console.log({
    //         pathname,
    //         href,
    //         currentPage,
    //     });
    // }

    const defaultStyles = cn(
        "relative px-4 py-3 font-extralight flex hover:bg-neutral-800 gap-x-4 items-center",
        activeNav && "bg-neutral-800 text-emerald-500 font-semibold"
    );

    return (
        <>
            {isOpen ? (
                <Link href={href} className={defaultStyles + " rounded-3xl"}>
                    <div className="flex justify-between w-full">
                        <div className="flex justify-center items-center gap-x-3 overflow-y-hidden">
                            {children}
                            {isOpen && <p className="line-clamp-1">{name}</p>}
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
                                <NotificationBadge variant="notification">
                                    {notificationCount}
                                </NotificationBadge>
                            )}
                            {children}
                        </div>
                    </Link>
                </Hint>
            )}
        </>
    );
};
