import { cn } from "@/lib/utils"

type Props = {
    className?: string
}

export const Separator = ({ className }: Props) => {
    return (
        <hr className={cn("h-0.5", className)} />
    )
}