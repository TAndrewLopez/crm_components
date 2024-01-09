"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/useSidebar";

type Props = {
    children: React.ReactNode;
};

export const Wrapper = ({ children }: Props) => {
    const { isOpen } = useSidebar()

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
