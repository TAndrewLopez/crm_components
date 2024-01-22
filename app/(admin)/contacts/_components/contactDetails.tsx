"use client";

import moment from "moment";
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
                    console.log("SOMETHING WENT WRONG", { error, selected_contact_id });
                }
            };
            fetchUser();
        }
    }, [selected_contact_id]);

    if (!contact || !selected_contact_id) return null;

    return (
        <div>
            <div className="py-4">
                <ContactUserHeader contact={contact} />
            </div>
            <div className="space-y-5">
                <ContactUserInformation contact={contact} />
                <ContactUserPersonalInfo contact={contact} />                    <ContactSubHistory contact={contact} />
                <ContactDepositHistory contact={contact} />
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
