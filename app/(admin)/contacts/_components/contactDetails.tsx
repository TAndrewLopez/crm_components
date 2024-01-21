import moment from "moment";
import { Bookmark, CircleUser, Mail, MessageCircle } from "lucide-react";
import { user } from "@prisma/client";

import { getContactByID } from "@/actions/contacts";
import { Badge } from "@/components/ui/badge";
import { cn, formatToUSNumber, removeSpecialCharacters } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";


type Props = {
    id: number;
}
export const ContactDetails = async ({ id }: Props) => {
    const contact = await getContactByID(id);

    return (
        <div>
            <div className="flex flex-col items-center py-4 gap-y-3">
                <div className="flex flex-col items-center justify-center">
                    <CircleUser className="hidden md:block md:w-10 md:h-10 xl:w-12 xl:h-12" />
                    <p className="capitalize font-semibold text-2xl">
                        {removeSpecialCharacters(contact.first_name).toLowerCase()}{" "}
                        {removeSpecialCharacters(contact.last_name).toLowerCase()}
                    </p>
                    <p className="text-sm font-extralight">{contact.username}</p>
                </div>

                <Badge variant="outline" className="capitalize">
                    {contact.role}
                </Badge>

                <div className="flex gap-x-3">
                    <div className="flex flex-col justify-center items-center">
                        <MessageCircle className="text-emerald-500 hover:cursor-pointer hover:text-white" />
                        <p className="text-xs">Message</p>
                    </div>
                    <div className="flex-1 mx-3 flex flex-col justify-center items-center">
                        <Mail className="text-emerald-500 hover:cursor-pointer hover:text-white" />
                        <p className="text-xs">Mail</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Bookmark
                            className={cn(
                                "text-emerald-500 hover:cursor-pointer hover:text-white",
                                // isBookmark && "fill-emerald-500"
                            )}
                        />
                        <p className="text-xs">Bookmark</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-x-3">
                <p>Phone Number:</p>
                <p>{formatToUSNumber(contact.phone_number)}</p>
            </div>
            <div className="flex gap-x-3">
                <p>Email</p>
                <p>{contact.email}</p>
            </div>
            <div className="flex gap-x-3">
                <p>Birthday</p>
                <p>{contact.birthday}</p>
            </div>
            <p>Created {moment(contact.created_at).fromNow()}</p>
        </div>
    );
};


export const ContactDetailsSkeleton = () => {
    return (
        <div>
            <div className="flex flex-col items-center py-4 gap-y-3">
                <div className="flex flex-col items-center justify-center p-4 gap-y-3">
                    <Skeleton className="hidden md:block md:w-10 md:h-10 xl:w-12 xl:h-12 bg-popover" />
                    <Skeleton className="w-60 h-6 bg-popover" />
                    <Skeleton className="w-32 h-6 bg-popover" />
                </div>
            </div>
        </div>
    )
}