"use client";

import { ArrowRightFromLine } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/useSidebar";

type Props = {};

export const Toggle = ({ }: Props) => {
    const { isOpen, onCollapse, onExpand } = useSidebar();
    const label = isOpen ? "Collapse" : "Expand";
    let onClick = isOpen ? onCollapse : onExpand


    return (
        <div className="flex items-center w-full">
            {isOpen && <p className="text-muted-foreground text-sm">Collapse</p>}
            <Hint label={label} side="right" asChild>
                <Button
                    onClick={onClick}
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
