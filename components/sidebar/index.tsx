import { SidebarFooter } from "./sidebarFooter";
import { SidebarHeader } from "./sidebarHeader";
import { SidebarFavoriteLinks } from "./sidebarFavoriteLinks";
import { SidebarLinks } from "./sidebarLinks";
import { SidebarUtilLinks } from "./sidebarUtilLinks";
import { SidebarWrapper } from "./sidebarWrapper";
import { getUserByUsername } from "@/actions/auth";

type Props = {};

export const Sidebar = async ({ }: Props) => {
    const user = await getUserByUsername('tandrewlopez')
    const imageURL = "";

    if (!user) return null;

    return (
        <SidebarWrapper>
            <SidebarHeader username={user.username} imageURL={imageURL} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <SidebarLinks />
                <SidebarFavoriteLinks />
                <SidebarUtilLinks />
            </div>
            <SidebarFooter />
        </SidebarWrapper>
    );
};
