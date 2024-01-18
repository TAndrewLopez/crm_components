import Link from "next/link";

import { cn } from "@/lib/utils";

type Props = {
    children: React.ReactNode;
    href?: string;
    status: string;
};

export const TableItem = ({ children, href = "", status }: Props) => {
    let content;
    href ? content = (
        <Link
            className="hover:underline"
            href={href}>
            {children}
        </Link>
    ) : content = children

    return (
        <div
            className={cn(
                status === "new" && "font-bold",
                status !== "new" && "text-muted-foreground"
            )}>
            {content}
        </div>
    );
};
