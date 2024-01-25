import { Separator } from "@/components/separator";
import { cn } from "@/lib/utils";

type Props = {
    action?: React.ReactNode,
    className?: string;
    children: React.ReactNode;
    showSeparator?: boolean;
    title: string;
};

export const WidgetWrapper = ({
    action,
    className,
    children,
    showSeparator,
    title,
}: Props) => {
    return (
        <div className={cn("flex flex-col gap-y-2", className)}>
            <div className="flex justify-between">
                <h3 className="font-medium text-xl">{title}</h3>
                {action}
            </div>
            {showSeparator && <Separator className="bg-white/40 w-full" />}
            {children}
        </div>
    );
};
