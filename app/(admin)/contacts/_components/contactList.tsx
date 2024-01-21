"use client";

import { user } from "@prisma/client";

import { cn, getFullName } from "@/lib/utils";
import { useContacts } from "@/store/useSelectedContact";

type Props = {
    contacts: user[];
};

export const ContactList = ({ contacts }: Props) => {
    const { selected_contact_id, setSelectedContactID } = useContacts();

    return (
        <ul className="flex flex-col gap-y-1 py-4 pr-4 overflow-y-auto h-[calc(100%-98px)]">
            {contacts.map(({ id, first_name, last_name }) => (
                <button
                    key={id}
                    className={cn(
                        "text-sm p-2 rounded-sm transition-all hover:bg-emerald-500/95 hover:font-semibold",
                        selected_contact_id === id
                            ? "bg-emerald-500/50 font-bold"
                            : "bg-primary-foreground"
                    )}
                    onClick={() => setSelectedContactID(id)}
                >
                    <p className="capitalize">{getFullName(first_name, last_name)}</p>
                </button>
            ))}
        </ul>
    );
};
