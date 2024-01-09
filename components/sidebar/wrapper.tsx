"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/useSidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

type Props = {
    children: React.ReactNode;
};

export const Wrapper = ({ children }: Props) => {
    const matches = useMediaQuery("(max-width:1024px)");
    const { isOpen, onCollapse, onExpand } = useSidebar();

    useEffect(() => {
        matches ? onCollapse() : onExpand();
    }, [matches, onCollapse, onExpand]);

    return (
        <aside
            className={cn(
                "flex flex-col w-[70px] bg-primary-foreground",
                isOpen && "w-80 min-w-[300px]"
            )}>
            {children}
        </aside>
    );
};
