import { getSelf } from "@/actions/auth";
import { getBookmarks } from "@/actions/bookmarks";
import {
    SidebarFavoriteLinks,
    SidebarFavoriteLinksSkeleton,
} from "./sidebarFavoriteLinks";
import { SidebarFooter, SidebarFooterSkeleton } from "./sidebarFooter";
import { SidebarHeader, SidebarHeaderSkeleton } from "./sidebarHeader";
import { SidebarLinks, SidebarLinksSkeleton } from "./sidebarLinks";
import { SidebarUtilLinks, SidebarUtilLinksSkeleton } from "./sidebarUtilLinks";
import { SidebarWrapper } from "./sidebarWrapper";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type Props = {};

export const Sidebar = async ({ }: Props) => {
    const self = await getSelf();
    const bookmarks = await getBookmarks();

    return (
        <SidebarWrapper>
            <SidebarHeader username={self.username} imageURL={self.image_url ?? ""} />
            <div className="flex-1 flex flex-col">
                <SidebarLinks role={self.role} />
                <SidebarFavoriteLinks bookmarks={bookmarks} />
                <SidebarUtilLinks />
            </div>
            <SidebarFooter />
        </SidebarWrapper>
    );
};

export const SidebarSkeleton = () => {
    return (
        <aside className="flex flex-col w-[70px] bg-primary-foreground">
            <SidebarHeaderSkeleton />
            <div className="flex flex-col flex-1">
                <SidebarLinksSkeleton />
                <SidebarFavoriteLinksSkeleton />
                <SidebarUtilLinksSkeleton />
            </div>
            <SidebarFooterSkeleton />
        </aside>
    );
};
