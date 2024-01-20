import type { Metadata } from "next";

import { getContacts } from "@/actions/contacts";
import { PageWrapper } from "@/components/pageWrapper";
import { Separator } from "@/components/separator";

export const metadata: Metadata = {
    title: "Contacts",
};

const ContactPage = async () => {
    const contacts = await getContacts();

    return (
        <PageWrapper className="flex flex-col gap-y-5 font-extralight h-full">
            <div className="h-full flex">
                <div className="border-r border-white/40 w-full md:w-auto md:min-w-80">
                    <h1 className="text-4xl font-semibold">Contacts</h1>
                    <Separator className="bg-white/40 h-0.5 mt-2" />
                    {
                        contacts.map(user => (
                            <div key={user.id}>
                                <p>{user.username}</p>
                            </div>
                        ))
                    }

                </div>

                <div className="hidden md:block flex-1">Right Column</div>
            </div>
        </PageWrapper>
    );
};

export default ContactPage;
