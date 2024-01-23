import { SidebarFooter } from "./sidebarFooter";
import { SidebarHeader } from "./sidebarHeader";
import { SidebarFavoriteLinks } from "./sidebarFavoriteLinks";
import { SidebarLinks } from "./sidebarLinks";
import { SidebarUtilLinks } from "./sidebarUtilLinks";
import { SidebarWrapper } from "./sidebarWrapper";

import { getBookmarks } from "@/actions/bookmarks";
import { getSelf } from "@/actions/auth";

type Props = {};

export const Sidebar = async ({ }: Props) => {
    const user = await getSelf();
    const bookmarks = await getBookmarks();

    return (
        <SidebarWrapper>
            <SidebarHeader username={user.username} imageURL={user.image_url ?? ""} />
            <div className="flex flex-col flex-1">
                <SidebarLinks />
                <SidebarFavoriteLinks bookmarks={bookmarks} />
                <SidebarUtilLinks />
            </div>
            <SidebarFooter />
        </SidebarWrapper>
    );
};
