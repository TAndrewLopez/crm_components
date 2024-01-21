import { user } from "@prisma/client";
import { ContactWidget } from "./contactWidget";

type Props = {
    contacts: user[]
}

export const ContactList = async ({ contacts }: Props) => {
    return (
        <ul className="flex flex-col gap-y-1 py-4 pr-4 overflow-y-auto h-[calc(100%-50px)]">
            {contacts.map((user) => (
                <ContactWidget id={user.id} username={user.username} key={user.id} />
            ))}
        </ul>
    );
};
