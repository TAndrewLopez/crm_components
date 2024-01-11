import { SidebarFooter } from "./sidebarFooter";
import { SidebarHeader } from "./sidebarHeader";
import { SidebarFavoriteLinks } from "./sidebarFavoriteLinks";
import { SidebarLinks } from "./sidebarLinks";
import { SidebarUtilLinks } from "./sidebarUtilLinks";
import { SidebarWrapper } from "./sidebarWrapper";

type Props = {};

export const Sidebar = ({ }: Props) => {
    const username = "tandrewlopez";
    const imageURL = "";

    return (
        <SidebarWrapper>
            <SidebarHeader username={username} imageURL={imageURL} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <SidebarLinks />
                <SidebarFavoriteLinks />
                <SidebarUtilLinks />
            </div>
            <SidebarFooter />
        </SidebarWrapper>
    );
};
