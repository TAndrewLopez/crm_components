import { CircleUser } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ContactUser } from "@/lib/types";
import { getFullName } from "@/lib/utils";

type Props = {
    contact: ContactUser
}

export const UserDetails = ({ contact }: Props) => {
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
