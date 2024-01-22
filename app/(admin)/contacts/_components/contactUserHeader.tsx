import { CircleUser } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ContactUser } from "@/lib/types";
import { getFullName } from "@/lib/utils";
import { ContactHeaderActions } from "./contactHeaderActions";

type Props = {
    contact: ContactUser;
};

export const ContactUserHeader = ({ contact }: Props) => {
    const { first_name, last_name, role, username } = contact;
    return (
        <div className="flex flex-col items-center gap-y-3">
            <div className="flex flex-col items-center justify-center">
                <CircleUser className="hidden md:block md:w-10 md:h-10 xl:w-12 xl:h-12" />
                <p className="capitalize font-semibold text-2xl">
                    {getFullName(first_name, last_name)}
                </p>
                <p className="text-sm font-extralight">{username}</p>
            </div>

            <Badge variant="outline" className="capitalize">
                {role}
            </Badge>

            <div className="flex gap-x-3">
                <ContactHeaderActions />
            </div>
        </div>
    );
};

export const ContactUserHeaderSkeleton = () => {
    return (
        <div className="flex flex-col items-center gap-y-2">
            <div className="flex flex-col items-center justify-center">
                <Skeleton className="hidden md:block md:w-10 md:h-10 xl:w-12 xl:h-12 bg-popover" />
                <Skeleton className="w-60 h-5 bg-popover" />
                <Skeleton className="w-20 h-3 bg-popover" />
                <Skeleton className="w-16 h-6 bg-popover" />
            </div>
            <div className="flex gap-x-8">
                <Skeleton className="w-6 h-6 rounded-full bg-popover" />
                <Skeleton className="w-6 h-6 rounded-full bg-popover" />
                <Skeleton className="w-6 h-6 rounded-full bg-popover" />
            </div>
        </div>
    );
};
