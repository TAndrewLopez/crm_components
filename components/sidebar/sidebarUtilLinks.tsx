import { BadgeHelpIcon, CogIcon } from "lucide-react";

import { Separator } from "@/components/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { NavItem } from "./navItem";

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
                            <Icon className="flex-none w-5 h-5" />
                        </NavItem>
                    ))}
                </ul>
            </div>
            <Separator className="bg-white/5" />
        </>
    );
};

export const SidebarUtilLinksSkeleton = () => {
    return (
        <>
            <div className="mx-2.5">
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