"use client";

import { useMediaQuery } from "usehooks-ts";
import { Toggle } from "./toggle";
import { useEffect, useState } from "react";

type Props = {};

export const Footer = ({ }: Props) => {
    const matches = useMediaQuery("(max-width: 1024px)");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <>
            {!matches && (
                <div className="h-[75px] p-4 flex items-center justify-between">
                    <Toggle />
                </div>
            )}
        </>
    );
};
