import { poppins } from "@/app/fonts";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
    children: React.ReactNode;
};

export const PageWrapper = ({ children, className }: Props) => {
    return (
        <div
            className={cn(
                "w-full mx-auto lg:max-w-[2000px] p-4 mt-2",
                className,
                poppins.className
            )}>
            {children}
        </div>
    );
};
