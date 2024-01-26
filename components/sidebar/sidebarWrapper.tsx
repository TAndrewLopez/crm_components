"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/useSidebar";

type Props = {
    children: React.ReactNode;
};

export const SidebarWrapper = ({ children }: Props) => {
    const matches = useMediaQuery("(max-width:1024px)");
    const { isOpen, onCollapse, onExpand } = useSidebar();

    useEffect(() => {
        matches ? onCollapse() : onExpand();
    }, [matches, onCollapse, onExpand]);

    return (
        <aside
            className={cn(
                "fixed w-[70px] top-0 bottom-0 left-0 z-10 flex flex-col bg-primary-foreground",
                // "flex flex-col w-[70px] bg-primary-foreground",
                isOpen && "min-w-80"
            )}>
            {children}
        </aside>
    );
};