import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "./userAvatar";

type Props = {
    imageURL: string;
    username: string
}

export const SidebarHeader = ({ imageURL, username }: Props) => {
    return (
        <header className="h-[75px] min-h-[75px] flex items-center justify-between bg-popover">
            <UserAvatar
                imageURL={imageURL}
                username={username}
                size='md'
            />
        </header>
    )
}

export const SidebarHeaderSkeleton = () => {
    return (
        <header className="h-[75px] min-h-[75px] flex justify-center items-center bg-popover">
            <Skeleton className="h-12 w-12 bg-primary-foreground rounded-full" />
        </header>
    )
}