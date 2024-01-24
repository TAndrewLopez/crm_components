import type { Metadata } from "next";
import { Suspense } from "react";

import { getContacts } from "@/actions/contacts";
import { getAdminContactCount } from "@/actions/counts";
import { PageWrapper } from "@/components/pageWrapper";
import { Separator } from "@/components/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ContactDetails, ContactDetailsSkeleton } from "./_components/contactDetails";
import { ContactList, ContactListSkeleton } from "./_components/contactList";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
    title: "Contacts",
};

type Props = {};

const ContactPage = async ({ }: Props) => {
    const contactsPromise = getContacts();
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
                        <Suspense fallback={<ContactListSkeleton />}>
                            <ContactList contacts={contacts} />
                        </Suspense>
                    </div>
                    <Suspense fallback={<ContactCountSkeleton />}>
                        <p className="pt-2 px-8 flex items-end justify-end">
                            {contactCount} {label}
                        </p>
                    </Suspense>
                </div>

                {/* RIGHT COLUMN */}
                <div className="col-span-8 overflow-y-auto py-4">
                    <Suspense fallback={<ContactDetailsSkeleton />}>
                        <ContactDetails />
                    </Suspense>
                </div>
            </div>
        </PageWrapper>
    );
};

export default ContactPage;


const ContactCountSkeleton = () => {
    return (
        <div className="mt-2 flex justify-end">
            <Skeleton className="w-20 h-10 bg-primary-foreground" />
        </div>
    )
}