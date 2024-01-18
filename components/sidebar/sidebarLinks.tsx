import {
    Calendar,
    FingerprintIcon,
    GanttChartIcon,
    SendHorizonalIcon,
    User,
} from "lucide-react";

import { getTotalContactCount, getUnreadSubCount } from "@/actions/count";
import { NavItem } from "./navItem";
import { Separator } from "../separator";

type Props = {};

export const SidebarLinks = async ({ }: Props) => {
    const subCount = await getUnreadSubCount()
    const contactCount = await getTotalContactCount()

    const LINKS = [
        {
            name: "Dashboard",
            href: "/",
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
            Icon: SendHorizonalIcon,
        },
        {
            name: "Contacts",
            href: "/contacts",
            Icon: User,
            count: contactCount
        },
    ];

    return (
        <>
            <div className="mx-2">
                <ul className="py-4 flex flex-col gap-y-3">
                    {LINKS.map(({ name, Icon, href, count }, i) => (
                        <NavItem name={name} href={href} count={count ?? i * 5} key={href}>
                            <Icon className="w-5 h-5" />
                        </NavItem>
                    ))}
                </ul>
            </div>
            <Separator className="bg-white/5" />
        </>

    );
};
