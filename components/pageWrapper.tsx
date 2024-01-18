import { poppins } from "@/fonts";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
    children: React.ReactNode;
};

export const PageWrapper = ({ children, className }: Props) => {
    return (
        <div
            className={cn(
                "w-full mx-auto xl:max-w-[2000px]",
                className,
                poppins.className
            )}>
            {children}
        </div>
    );
};
