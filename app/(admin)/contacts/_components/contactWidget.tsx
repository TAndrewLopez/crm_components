"use client";

import { cn } from "@/lib/utils";
import { useSelectedContact } from "@/store/useSelectedContact";

type Props = {
    id: number;
    username: string;
};

export const ContactWidget = ({ id, username }: Props) => {
    const { contact_id, setContactID } = useSelectedContact();

    return (
        <button
            className={cn(
                "text-sm p-2 rounded-sm transition-all hover:bg-emerald-500/50",
                contact_id === id ? "bg-emerald-500 font-bold" : "bg-primary-foreground"
            )}
            onClick={() => setContactID(id)}>
            <p>{username}</p>
        </button>
    );
};
