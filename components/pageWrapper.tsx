'use client'

import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/useSidebar";

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

type Props = {
    className?: string;
    children: React.ReactNode;
};

export const PageWrapper = ({ children, className }: Props) => {
    const { isOpen } = useSidebar()
    return (
        <div
            className={cn(
                "fixed top-0 bottom-0 right-0 left-[70px] overflow-y-auto z-0",
                // "w-full h-full",
                isOpen && 'left-80',
                className,
                poppins.className
            )}>
            {children}
        </div>
    );
};
