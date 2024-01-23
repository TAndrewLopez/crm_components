import type { Metadata } from "next";

import { PageWrapper } from "@/components/pageWrapper";
import { Separator } from "@/components/separator";
import { ContactList } from "./_components/contactList";
import { getContacts } from "@/actions/contacts";
import { getAdminContactCount } from "@/actions/counts";
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
        <PageWrapper>
            <div className="w-full h-full grid grid-cols-12 overflow-y-auto ">
                {/* LEFT COLUMN */}
                <div className="p-4 col-span-12 md:col-span-4 border-r border-white/40 overflow-y-auto">
                    <h1 className="text-4xl font-semibold">Contacts</h1>
                    <Separator className="bg-white/40 h-0.5 my-2" />
                    <div className="px-4 py-4 bg-popover rounded-md">
                        Disabled Contact Filter
                    </div>
                    <div className="mt-2 overflow-y-auto">
                        <ContactList contacts={contacts} />
                    </div>
                    <p className="pt-2 px-8 flex items-end justify-end">
                        {contactCount} {label}
                    </p>
                </div>

                {/* RIGHT COLUMN */}
                <div className="hidden md:block col-span-8 overflow-y-auto py-4">
                    <ContactDetails />
                </div>
            </div>
        </PageWrapper>
    );
};

export default ContactPage;

