import { UserAvatar } from "./userAvatar";

type Props = {
    imageURL: string;
    username: string
}

export const SidebarHeader = ({ imageURL, username }: Props) => {
    return (
        <header className="h-[75px] flex items-center justify-between bg-black/80">
            <UserAvatar
                imageURL={imageURL}
                username={username}
                size='md'
            />
        </header>
    )
}