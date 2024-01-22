import type { Metadata } from "next";

import { PageWrapper } from "@/components/pageWrapper";
import { Separator } from "@/components/separator";
import { ContactList } from "./_components/contactList";
import { getContacts } from "@/actions/contacts";
import { getAdminContactCount } from "@/actions/count";
import { ContactDetails } from "./_components/contactDetails";

export const metadata: Metadata = {
    title: "Contacts",
};

const ContactPage = async () => {
    const contactsPromise = getContacts("first_name");
    const contactCountPromise = getAdminContactCount();
    const [contacts, contactCount] = await Promise.all([
        contactsPromise,
        contactCountPromise,
    ]);
    const label = contactCount > 1 ? "Total Contacts" : "Contact";

    return (
        <PageWrapper className="flex flex-col gap-y-5 font-extralight p-4">
            <div className="h-full flex">
                {/* LEFT COLUMN */}
                <div className="hidden border-r border-white/40 w-full md:w-auto md:min-w-80">
                    <h1 className="text-4xl font-semibold">Contacts</h1>
                    <Separator className="bg-white/40 h-0.5 my-2" />
                    <div className="px-4 py-4 mr-4 bg-popover rounded-md">
                        Disabled Contact Filter
                    </div>
                    <div className="pr-4 mt-3 overflow-y-auto h-[calc(100%-200px)]">
                        <ContactList contacts={contacts} />
                    </div>
                    <p className="pt-2 px-8 flex items-end justify-end">
                        {contactCount} {label}
                    </p>
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex-1 overflow-y-auto">
                    <ContactDetails />
                    <ContactDetails />
                    <ContactDetails />
                </div>
            </div>
        </PageWrapper>
    );
};

export default ContactPage;
