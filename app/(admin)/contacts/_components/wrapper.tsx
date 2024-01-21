"use client";

import { useContacts } from "@/store/useSelectedContact";
import { ContactDetails, ContactDetailsSkeleton } from "./contactDetails";
import { Suspense } from "react";

export const Wrapper = () => {
    const { selected_contact_id } = useContacts();
    if (!selected_contact_id) return null;

    return (
        <Suspense fallback={<ContactDetailsSkeleton />}>
            <ContactDetails id={selected_contact_id} />
        </Suspense>
    );
};
