import {
    Calendar,
    FingerprintIcon,
    GanttChartIcon,
    SendHorizonalIcon,
    User,
} from "lucide-react";

import { NavItem } from "./navItem";
import { db } from "@/lib/prisma";
import { getUnreadSubCount } from "@/actions/count";

type Props = {};

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
    },
    {
        name: "Calendar",
        href: "/calendar",
        Icon: Calendar,
    },
    {
        name: "Messages",
        href: "/message",
        Icon: SendHorizonalIcon,
    },
    {
        name: "Contacts",
        href: "/contact",
        Icon: User,
    },
];

export const SidebarLinks = async ({ }: Props) => {
    const subCount = await getUnreadSubCount()

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
            href: "/message",
            Icon: SendHorizonalIcon,
        },
        {
            name: "Contacts",
            href: "/contact",
            Icon: User,
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
            <hr />
        </>

    );
};
