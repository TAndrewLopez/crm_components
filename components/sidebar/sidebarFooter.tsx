"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { Skeleton } from "@/components/ui/skeleton";
import { Toggle } from "./toggle";

type Props = {};

export const SidebarFooter = ({ }: Props) => {
    const matches = useMediaQuery("(max-width: 1024px)");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <>
            {!matches && (
                <div className="h-[75px] hidden md:flex p-4 items-center justify-between">
                    <Toggle />
                </div>
            )}
        </>
    );
};

export const SidebarFooterSkeleton = () => {
    return (
        <div className="h-[75px] mx-2.5 flex items-center justify-between">
            <Skeleton className="h-12 w-12 bg-popover rounded-md" />
        </div>
    )
}