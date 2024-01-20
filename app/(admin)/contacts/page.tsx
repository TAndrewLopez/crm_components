import type { Metadata } from "next";

import { getContacts } from "@/actions/contacts";
import { PageWrapper } from "@/components/pageWrapper";
import { Separator } from "@/components/separator";
import { getRandomNumBetween } from "@/lib/utils";
import { ContactDetails } from "./_components/contactDetails";

export const metadata: Metadata = {
    title: "Contacts",
};

const ContactPage = async () => {
    const contacts = await getContacts();
    const n = getRandomNumBetween(contacts.length - 1);
    const contact = contacts[n];
    return (
        <PageWrapper className="flex flex-col gap-y-5 font-extralight h-full">
            <div className="h-full flex">
                {/* LEFT COLUMN */}
                <div className="border-r border-white/40 w-full md:w-auto md:min-w-80">
                    <h1 className="text-4xl font-semibold">Contacts</h1>
                    <Separator className="bg-white/40 h-0.5 mt-2" />
                    <ul className="flex flex-col gap-y-0.5 py-4 pr-4 overflow-y-auto h-[calc(100%-50px)]">
                        {contacts.map((user) => (
                            <div
                                className="bg-primary-foreground p-2 rounded-sm"
                                key={user.id}>
                                <p className="text-sm font-extralight">{user.username}</p>
                            </div>
                        ))}
                    </ul>
                </div>
                {/* RIGHT COLUMN */}
                <div className="hidden md:block flex-1 pl-4 overflow-x-auto bg-red-200">
                    <ContactDetails contact={contact} />
                </div>
            </div>
        </PageWrapper>
    );
};

export default ContactPage;
