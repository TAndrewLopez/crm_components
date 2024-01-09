import {
    TooltipProvider,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "./ui/tooltip";

type Props = {
    align?: "start" | "center" | "end";
    asChild?: boolean;
    children: React.ReactNode;
    delayAmount?: number
    label: string;
    side?: "top" | "bottom" | "left" | "right";
};

export const Hint = ({ align, asChild, children, delayAmount, label, side }: Props) => {
    return (
        <TooltipProvider delayDuration={delayAmount}>
            <Tooltip>
                <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
                <TooltipContent
                    className="bg-white text-black"
                    side={side}
                    align={align}>
                    <p className="font-semibold">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
