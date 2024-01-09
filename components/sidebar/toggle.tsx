"use client"

import { ArrowRightFromLine } from "lucide-react";

import { useSidebar } from "@/store/useSidebar";
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {};

export const Toggle = ({ }: Props) => {
    const { isOpen, toggleSidebar } = useSidebar();
    const label = isOpen ? "Collapse" : "Expand";

    return (
        <div className="flex items-center w-full">
            <Hint label={label} side="right" asChild>
                <Button
                    onClick={toggleSidebar}
                    className="h-auto p-2 ml-auto"
                    variant="ghost">
                    <ArrowRightFromLine
                        className={cn("h-4 w-4", isOpen && "rotate-180")}
                    />
                </Button>
            </Hint>
        </div>
    );
};
