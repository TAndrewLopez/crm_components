import { cn } from "@/lib/utils";

type Props = {
    className?: string;
    children: React.ReactNode;
    showSeparator?: boolean;
    title: string;
};

export const WidgetWrapper = ({
    className,
    children,
    showSeparator,
    title,
}: Props) => {
    return (
        <div className={cn("flex flex-col gap-y-2", className)}>
            <h3 className="font-medium text-xl">{title}</h3>
            {showSeparator && <hr className="bg-white/40 h-0.5 w-full" />}
            {children}
        </div>
    );
};
