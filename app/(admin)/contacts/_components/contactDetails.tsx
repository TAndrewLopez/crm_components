import { Bookmark, CircleUser, Mail, MessageCircle } from "lucide-react";
import moment from "moment";

import { getContactByID } from "@/actions/contacts";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { WidgetWrapper } from "@/components/widgetWrapper";
import { cn, formatToUSNumber, getFullName } from "@/lib/utils";
import { NavToSubmission } from "./navToSubmission";
import { submission, user } from "@prisma/client";

type Props = {
    id: number;
};


type submissions = submission[]

type User = user & {
    submissions: submissions
}

export const ContactDetails = async ({ id }: Props) => {
    // TODO: POSSIBLE ISSUE WITH THIS COMPONENT MAKING MULTIPLE CALLS BECAUSE OF HOT RELOAD
    // const contact = await getContactByID(id);
    // const contact = await getContactByID(8);
    // console.log(contact)
    const contact: User = {
        "id": 8,
        "first_name": "Nereida",
        "last_name": "Dobson",
        "username": "absurdInsomniac",
        "email": "absurd.insomniac@email.com",
        "role": "admin",
        "phone_number": "5988918037",
        "image_url": null,
        "birthday": null,
        "created_at": new Date("1990-01-01T08:19:33.000Z"),
        "updated_at": null,
        "submissions": [
            {
                "id": 33,
                "author_id": 8,
                "status": "closed",
                "name": "Nereida Dobson",
                "email": "nereida.dobson@email.com",
                "phone_number": "7398107334",
                "preferred_pronouns": "she/her",
                "size": "Thing 1",
                "placement": "Thing 1",
                "color": "color",
                "description": "Thing 1",
                "created_at": new Date("2023-02-28T09:02:02.000Z"),
                "updated_at": null
            },
            {
                "id": 34,
                "author_id": 8,
                "status": "closed",
                "name": "Nereida Dobson",
                "email": "nereida.dobson@email.com",
                "phone_number": "7398107334",
                "preferred_pronouns": "she/her",
                "size": "Thing 2",
                "placement": "Thing 2",
                "color": "color",
                "description": "Thing 2",
                "created_at": new Date("2023-04-28T09:02:02.000Z"),
                "updated_at": null
            },
            {
                "id": 35,
                "author_id": 8,
                "status": "closed",
                "name": "Nereida Dobson",
                "email": "nereida.dobson@email.com",
                "phone_number": "7398107334",
                "preferred_pronouns": "she/her",
                "size": "Thing 3",
                "placement": "Thing 3",
                "color": "color",
                "description": "Thing 3",
                "created_at": new Date("2023-06-28T09:02:02.000Z"),
                "updated_at": null
            },
            {
                "id": 36,
                "author_id": 8,
                "status": "closed",
                "name": "Nereida Dobson",
                "email": "nereida.dobson@email.com",
                "phone_number": "7398107334",
                "preferred_pronouns": "she/her",
                "size": "Thing 4 ",
                "placement": "Thing 4 ",
                "color": "color",
                "description": "Thing 4 ",
                "created_at": new Date("2023-08-28T09:02:02.000Z"),
                "updated_at": null
            },
            {
                "id": 37,
                "author_id": 8,
                "status": "new",
                "name": "Nereida Dobson",
                "email": "nereida.dobson@email.com",
                "phone_number": "7398107334",
                "preferred_pronouns": "she/her",
                "size": "Thing 5",
                "placement": "Thing 5",
                "color": "color",
                "description": "Thing 5",
                "created_at": new Date("2023-10-28T09:02:02.000Z"),
                "updated_at": null
            }
        ]
    }

    return (
        <div>
            <div className="flex flex-col items-center py-4 gap-y-3">
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
                                "text-emerald-500 hover:cursor-pointer hover:text-white"
                            )}
                        />
                        <p className="text-xs">Bookmark</p>
                    </div>
                </div>
            </div>

            <div className="space-y-5">
                <WidgetWrapper title="Contact Information" showSeparator>
                    <div className="flex gap-x-3">
                        <p>Phone Number:</p>
                        <p>{formatToUSNumber(contact.phone_number)}</p>
                    </div>
                    <div className="flex gap-x-3">
                        <p>Email</p>
                        <p>{contact.email}</p>
                    </div>
                </WidgetWrapper>
                <WidgetWrapper title="Personal Information" showSeparator>
                    <div className="flex gap-x-3">
                        <p>Birthday</p>
                        <p>{contact.birthday}</p>
                    </div>
                </WidgetWrapper>

                {!!contact.submissions && (
                    <WidgetWrapper title="Submission History" showSeparator>
                        {contact.submissions.map((sub) => (
                            <NavToSubmission
                                id={sub.id}
                                status={sub.status}
                                created_at={sub.created_at}
                                key={sub.id}
                            />
                        ))}
                    </WidgetWrapper>
                )}

                <p>Payment/Deposit History</p>
                <p>Join organization {moment(contact.created_at).fromNow()}</p>
            </div>

            {contact.role === "admin" && (
                <>
                    <p>Recent Activity Feed</p>
                    <p>Calendar/Availability</p>
                </>
            )}
        </div>
    );
};

export const ContactDetailsSkeleton = () => {
    return (
        <div>
            <div className="flex flex-col items-center py-4 gap-y-2">
                <div className="flex flex-col items-center justify-center gap-y-3">
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
        </div>
    );
};
