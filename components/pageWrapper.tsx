import { cn } from "@/lib/utils";

import { Poppins } from "next/font/google";

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

type Props = {
    className?: string;
    children: React.ReactNode;
};

export const PageWrapper = ({ children, className }: Props) => {
    return (
        <div
            className={cn(
                "w-full h-full",
                className,
                poppins.className
            )}>
            {children}
        </div>
    );
};
