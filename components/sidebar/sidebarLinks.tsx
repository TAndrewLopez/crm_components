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
import { NavItem } from "./navItem";

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
            <div className="mx-2 flex justify-center">
                <ul className="w-full py-2 flex flex-col gap-y-1 hidden-scrollbar">
                    {LINKS.map(({ name, Icon, href, count }) => (
                        <NavItem name={name} href={href} count={count} key={href}>
                            <Icon className="w-5 h-5 flex-none" />
                        </NavItem>
                    ))}
                </ul>
            </div>
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