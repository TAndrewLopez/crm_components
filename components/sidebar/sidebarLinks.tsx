import {
    Calendar,
    FingerprintIcon,
    GanttChartIcon,
    MessageCircle,
    User,
} from "lucide-react";

import { getUnreadSubCount } from "@/actions/counts";
import { Separator } from "@/components/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { role } from "@prisma/client";
import { NavItem } from "./navItem";

type Props = {
    role: role
};

export const SidebarLinks = async ({ role }: Props) => {
    const dashboardUser = role === 'dev' || role === 'owner'
    const subCount = await getUnreadSubCount()

    const LINKS = [
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
            <nav className="mx-2 flex justify-center">
                <ul className="w-full py-2 flex flex-col gap-y-1 hidden-scrollbar">
                    {
                        dashboardUser && (
                            <NavItem name='Dashboard' href='/dashboard'>
                                <FingerprintIcon className="w-5 h-5 flex-none" />
                            </NavItem>
                        )
                    }
                    {LINKS.map(({ name, Icon, href, count }) => (
                        <NavItem name={name} href={href} count={count} key={href}>
                            <Icon className="w-5 h-5 flex-none" />
                        </NavItem>
                    ))}
                </ul>
            </nav>
            <Separator className="bg-white/5" />
        </>

    );
};



export const SidebarLinksSkeleton = () => {
    return (
        <>
            <div className="mx-2.5 flex justify-center">
                <ul className="w-full py-2 flex flex-col gap-y-1">
                    <Skeleton className="h-12 w-12 bg-popover rounded-md" />
                    <Skeleton className="h-12 w-12 bg-popover rounded-md" />
                    <Skeleton className="h-12 w-12 bg-popover rounded-md" />
                    <Skeleton className="h-12 w-12 bg-popover rounded-md" />
                </ul>
            </div>
            <Separator className="bg-white/5" />
        </>
    )
}