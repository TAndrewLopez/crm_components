import type { Metadata } from "next";

import { PageWrapper } from "@/components/pageWrapper";
import { Separator } from "@/components/separator";
import {
    ContactDetails,
    ContactDetailsSkeleton,
} from "./_components/contactDetails";
import { ContactList } from "./_components/contactList";
import { getContacts } from "@/actions/contacts";
import { Suspense } from "react";
import { Wrapper } from "./_components/wrapper";

export const metadata: Metadata = {
    title: "Contacts",
};

const ContactPage = async () => {
    const contacts = await getContacts();

    return (
        <PageWrapper className="flex flex-col gap-y-5 font-extralight h-full">
            <div className="h-full flex">
                {/* LEFT COLUMN */}
                <div className="border-r border-white/40 w-full md:w-auto md:min-w-80">
                    <h1 className="text-4xl font-semibold">Contacts</h1>
                    <Separator className="bg-white/40 h-0.5 mt-2" />
                    Contact Filter
                    <ContactList contacts={contacts} />
                </div>

                {/* RIGHT COLUMN */}
                <div className="hidden md:block flex-1 pl-4 overflow-x-auto ">
                    <Suspense fallback={<ContactDetailsSkeleton />}>
                        <Wrapper />
                    </Suspense>
                    {/* Admin - ContactActivityFeed, Availability/Calendar Client - Submission
                    History & Payment/Deposit History */}
                </div>
            </div>
        </PageWrapper>
    );
};

export default ContactPage;
