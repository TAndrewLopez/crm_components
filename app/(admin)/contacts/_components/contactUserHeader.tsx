import { CircleUser } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ContactUser } from "@/lib/types";
import { getFullName } from "@/lib/utils";
import { ContactHeaderActions } from "./contactHeaderActions";

type Props = {
    contact: ContactUser;
};

export const ContactUserHeader = ({ contact }: Props) => {
    const { first_name, last_name, role, username } = contact;
    return (
        <div className="flex flex-col items-center gap-y-6">
            <div className="flex flex-col items-center gap-y-2">
                <div className="flex flex-col items-center justify-center gap-y-1.5">
                    <CircleUser className="w-12 h-12" />
                    <div className="flex flex-col items-center">
                        <p className="capitalize font-semibold text-2xl">
                            {getFullName(first_name, last_name)}
                        </p>
                        <p className="text-sm font-extralight">{username}</p>
                    </div>
                </div>
                <Badge variant="outline" className="capitalize">
                    {role}
                </Badge>
            </div>
            <div className="flex gap-x-3">
                <ContactHeaderActions />
            </div>
        </div>
    );
};