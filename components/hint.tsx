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
    label: string;
    side?: "top" | "bottom" | "left" | "right";
};

export const Hint = ({ align, asChild, children, label, side }: Props) => {
    return (
        <TooltipProvider>
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
