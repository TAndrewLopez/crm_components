"use client";

import { useEffect, useState } from "react";

import { getContactByID } from "@/actions/contacts";
import { ContactUser } from "@/lib/types";
import { useContacts } from "@/store/useContacts";
import { ContactSubHistory } from "./contactSubHistory";
import { ContactUserHeader } from "./contactUserHeader";
import { ContactUserInformation } from "./contactUserInformation";
import { ContactUserPersonalInfo } from "./contactUserPersonalInfo";
import { ContactDepositHistory } from "./contactDepositHistory";

export const ContactDetails = () => {
    const [contact, setContact] = useState<ContactUser | null>(null);
    const { selected_contact_id } = useContacts();

    useEffect(() => {
        if (selected_contact_id) {
            const fetchUser = async () => {
                try {
                    const user = await getContactByID(selected_contact_id);
                    setContact(user);
                } catch (error) {
                    console.log(`Something went wrong with fetching user with user_id: ${selected_contact_id}`, error);
                }
            };
            fetchUser();
        }
    }, [selected_contact_id]);

    if (!contact || !selected_contact_id) return null;

    return (
        <div className="">
            <div className="mb-4">
                <ContactUserHeader contact={contact} />
            </div>
            <ContactUserInformation contact={contact} />
            <ContactUserPersonalInfo contact={contact} />
            <ContactSubHistory contact={contact} />
            <ContactDepositHistory contact={contact} />

            {contact.role === "admin" && (
                <>
                    <p>Recent Activity Feed</p>
                    <p>Calendar/Availability</p>
                </>
            )}

        </div>
    );
};
