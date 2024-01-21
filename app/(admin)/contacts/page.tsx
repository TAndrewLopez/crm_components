import type { Metadata } from "next";
import { Suspense } from "react";

import { PageWrapper } from "@/components/pageWrapper";
import { Separator } from "@/components/separator";
import { ContactDetailsSkeleton } from "./_components/contactDetails";
import { ContactList } from "./_components/contactList";
import { getContacts } from "@/actions/contacts";
import { Wrapper } from "./_components/wrapper";
import { getAdminContactCount } from "@/actions/count";

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
        <PageWrapper className="flex flex-col gap-y-5 font-extralight h-full">
            <div className="h-full flex">
                {/* LEFT COLUMN */}
                <div className="border-r border-white/40 w-full md:w-auto md:min-w-80">
                    <h1 className="text-4xl font-semibold">Contacts</h1>
                    <Separator className="bg-white/40 h-0.5 mt-2" />
                    Contact Filter
                    <ContactList contacts={contacts} />
                    <p className="pt-2 px-8 flex items-end justify-end">
                        {contactCount} {label}
                    </p>
                </div>

                {/* RIGHT COLUMN */}
                <div className="hidden md:block flex-1 pl-4 overflow-x-auto ">
                    <Wrapper />
                </div>
            </div>
        </PageWrapper>
    );
};

export default ContactPage;
