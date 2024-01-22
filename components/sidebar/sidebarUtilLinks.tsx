import { BadgeHelpIcon, CogIcon } from "lucide-react";

import { NavItem } from "./navItem";
import { Separator } from "../separator";

type Props = {};

const FOOTER = [
    {
        name: "Support & FAQs",
        Icon: BadgeHelpIcon,
        href: "/support",
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
                <ul className="w-full py-2 flex flex-col gap-y-1">
                    {FOOTER.map(({ href, Icon, name }) => (
                        <NavItem href={href} name={name} key={href}>
                            <Icon className="w-5 h-5" />
                        </NavItem>
                    ))}
                </ul>
            </div>
            <Separator className="bg-white/5" />
        </>
    );
};
