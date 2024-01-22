import {
    Calendar,
    FingerprintIcon,
    GanttChartIcon,
    MessageCircle,
    User,
} from "lucide-react";

import { getUnreadSubCount } from "@/actions/count";
import { NavItem } from "./navItem";
import { Separator } from "../separator";

type Props = {};

export const SidebarLinks = async ({ }: Props) => {
    const subCount = await getUnreadSubCount()

    const LINKS = [
        {
            name: "Dashboard",
            href: "/dashboard",
            Icon: FingerprintIcon,
        },
        {
            name: "Submissions",
            href: "/submissions",
            Icon: GanttChartIcon,
            count: subCount
        },
        {
            name: "Calendar",
            href: "/calendar",
            Icon: Calendar,
        },
        {
            name: "Messages",
            href: "/messages",
            Icon: MessageCircle,
        },
        {
            name: "Contacts",
            href: "/contacts",
            Icon: User,
        },
    ];

    return (
        <>
            <div className="mx-2">
                <ul className="py-4 flex flex-col gap-y-3">
                    {LINKS.map(({ name, Icon, href, count }, i) => (
                        <NavItem name={name} href={href} count={count} key={href}>
                            <Icon className="w-5 h-5" />
                        </NavItem>
                    ))}
                </ul>
            </div>
            <Separator className="bg-white/5" />
        </>

    );
};
