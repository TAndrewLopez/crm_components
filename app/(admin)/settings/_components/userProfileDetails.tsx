import { CircleUser } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ContactUser } from "@/lib/types";
import { getFullName } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
    contact: ContactUser
}

export const UserProfileDetails = ({ contact }: Props) => {
    return (
        <div className="flex flex-col items-center gap-y-3">
            <div className="flex flex-col items-center justify-center">
                <CircleUser className="hidden md:block md:w-10 md:h-10 xl:w-12 xl:h-12" />
                <p className="capitalize font-semibold text-2xl">
                    {getFullName(contact.first_name, contact.last_name)}
                </p>
                <p className="text-sm font-extralight">{contact.username}</p>
            </div>

            <Badge variant="outline" className="capitalize">
                {contact.role}
            </Badge>

        </div>
    );
};


export const UserProfileDetailsSkeleton = () => {
    return (
        <div className="flex flex-col items-center gap-y-3">
            <div className="flex flex-col items-center justify-center gap-y-2">
                <Skeleton className="w-12 h-12 rounded-full bg-primary-foreground" />
                <Skeleton className="w-52 h-8 rounded-md bg-primary-foreground" />
                <Skeleton className="w-40 h-5 rounded-md bg-primary-foreground" />
            </div>
            <Skeleton className="w-20 h-5 rounded-md bg-primary-foreground" />
        </div>
    )
}