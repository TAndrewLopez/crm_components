import { SidebarFooter } from "./sidebarFooter";
import { SidebarHeader } from "./sidebarHeader";
import { SidebarFavoriteLinks } from "./sidebarFavoriteLinks";
import { SidebarLinks } from "./sidebarLinks";
import { SidebarUtilLinks } from "./sidebarUtilLinks";
import { SidebarWrapper } from "./sidebarWrapper";

import { getBookmarks } from "@/actions/bookmark";
import { getContactByUsername } from "@/actions/contacts";


type Props = {};

export const Sidebar = async ({ }: Props) => {
    const user = await getContactByUsername('tandrewlopez')
    const bookmarks = await getBookmarks()

    return (
        <SidebarWrapper>
            <SidebarHeader username={user.username} imageURL={user.image_url ?? ''} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <SidebarLinks />
                <SidebarFavoriteLinks bookmarks={bookmarks} />
                <SidebarUtilLinks />
            </div>
            <SidebarFooter />
        </SidebarWrapper>
    );
};
