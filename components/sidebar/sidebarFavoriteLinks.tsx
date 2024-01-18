import { Separator } from "../separator";
import { NavItem } from "./navItem";

type Props = {};

const VIEWS = [
    {
        icon: "📫",
        title: "Favorite Submission #1",
        href: "/submission/1",
    },
    {
        icon: "📱",
        title: "Favorite Contact #1",
        href: "/contact/u/123",
    },
    {
        icon: "📞",
        title: "Favorite Submission #2",
        href: "/submission/420",
    },
    {
        icon: "❓",
        title: "All Contacts",
        href: "/contact/u",
    },
];

export const SidebarFavoriteLinks = ({ }: Props) => {
    return (
        <>
            <div className="mx-2 flex-1 overflow-y-auto hidden-scrollbar">
                <ul className="py-4 flex flex-col gap-y-1">
                    {VIEWS.map(({ href, icon, title }) => (
                        <NavItem name={title} href={href} key={href}>
                            {icon}
                        </NavItem>
                    ))}
                </ul>
            </div>
            <Separator className="bg-white/5" />
        </>
    );
};
