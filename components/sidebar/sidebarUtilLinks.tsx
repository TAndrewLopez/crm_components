import { BadgeHelpIcon, CogIcon, Plug } from "lucide-react";

import { NavItem } from "./navItem";

type Props = {};

const FOOTER = [
    {
        name: "Support & FAQs",
        Icon: BadgeHelpIcon,
        href: "/support",
    },
    {
        name: "Integration",
        Icon: Plug,
        href: "/somewhere",
    },
    {
        name: "Settings",
        Icon: CogIcon,
        href: "/settings",
    },
];

export const SidebarUtilLinks = ({ }: Props) => {
    return (
        <>
            <div className="mx-2">
                <ul className="py-4">
                    {FOOTER.map(({ href, Icon, name }) => (
                        <NavItem href={href} name={name} key={href}>
                            <Icon className="w-5 h-5" />
                        </NavItem>
                    ))}
                </ul>
            </div>
            <hr />
        </>

    );
};
