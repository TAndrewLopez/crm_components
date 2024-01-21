'use client'

import { useSelectedContact } from "@/store/useSelectedContact"
import { ContactDetails } from "./contactDetails"

export const Wrapper = () => {
    const { contact_id } = useSelectedContact()

    if (!contact_id) return null

    return (
        <ContactDetails id={contact_id} />
    )
}