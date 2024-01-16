import { cn } from "@/lib/utils";

type Props = {
    children: React.ReactNode;
    status: string;
};

export const TableItem = ({ children, status }: Props) => {
    return (
        <div
            className={cn(
                status === "unread" && "font-bold",
                status === "read" && "text-muted-foreground"
            )}>
            {children}
        </div>
    );
};
