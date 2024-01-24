"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { getContactByID } from "@/actions/contacts";
import { Skeleton } from "@/components/ui/skeleton";
import { ContactUser } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useContacts } from "@/store/useContacts";
import { ContactUserSubHistory } from "./constUserSubHistory";
import { ContactDepositHistory } from "./contactDepositHistory";
import { ContactUserHeader } from "./contactUserHeader";
import { ContactUserInformation } from "./contactUserInformation";
import { ContactUserPersonalInfo } from "./contactUserPersonalInfo";

export const ContactDetails = () => {
    const matches = useMediaQuery("(max-width:768px)");
    const [contact, setContact] = useState<ContactUser | null>(null);
    const { selected_contact_id, setSelectedContactID } = useContacts();

    useEffect(() => {
        if (selected_contact_id) {
            const fetchUser = async () => {
                try {
                    const user = await getContactByID(selected_contact_id);
                    setContact(user);
                } catch (error) {
                    console.log(
                        `Something went wrong with fetching user with user_id: ${selected_contact_id}`,
                        error
                    );
                }
            };
            fetchUser();
        }
    }, [selected_contact_id]);

    if (!contact || !selected_contact_id) return null;

    return (
        <div
            className={cn(
                matches &&
                "bg-secondary fixed top-0 right-0 bottom-0 left-[75px] py-4 overflow-y-auto"
            )}>
            <div className="space-y-6 px-4">
                <button
                    className="md:hidden"
                    onClick={() => setSelectedContactID(null)}>
                    Close
                </button>
                <ContactUserHeader contact={contact} />
                <ContactUserInformation contact={contact} />
                <ContactUserPersonalInfo contact={contact} />
                <ContactUserSubHistory contact={contact} />
                <ContactDepositHistory contact={contact} />
                {contact.role === "admin" && (
                    <>
                        <p>Recent Activity Feed</p>
                        <p>Calendar/Availability</p>
                    </>
                )}
            </div>
        </div>
    );
};

export const ContactDetailsSkeleton = () => {
    return (
        <div className="bg-secondary p-4 space-y-14">
            <div className="flex flex-col items-center gap-y-8">
                <div className="flex flex-col items-center gap-y-2">
                    <Skeleton className="w-12 h-12 rounded-full bg-popover" />
                    <Skeleton className="w-52 h-6 rounded-md bg-popover" />
                    <Skeleton className="w-36 h-5 rounded-md bg-popover" />
                    <Skeleton className="w-20 h-5 rounded-md bg-popover" />
                </div>
                <div className="flex gap-x-5">
                    <Skeleton className="w-10 h-10 rounded-full bg-popover" />
                    <Skeleton className="w-10 h-10 rounded-full bg-popover" />
                    <Skeleton className="w-10 h-10 rounded-full bg-popover" />
                </div>
            </div>
            <div className="space-y-3">
                <Skeleton className="w-60 h-6 rounded-md bg-popover" />
                <Skeleton className="w-36 h-6 rounded-md bg-popover" />
            </div>
            <div className="space-y-3">
                <Skeleton className="w-60 h-6 rounded-md bg-popover" />
                <Skeleton className="w-36 h-6 rounded-md bg-popover" />
            </div>
            <div className="space-y-3">
                <Skeleton className="w-60 h-6 rounded-md bg-popover" />
                <Skeleton className="w-36 h-6 rounded-md bg-popover" />
            </div>
        </div>
    );
};
