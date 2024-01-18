import { type Metadata } from "next";

import { getAllRolesWithCount } from "@/actions/contacts";
import { PageWrapper } from "@/components/pageWrapper";

export const metadata: Metadata = {
    title: "Contacts",
}

const ContactPage = async () => {
    const roles = await getAllRolesWithCount();

    return (
        <PageWrapper className="flex flex-col gap-y-5 font-extralight">
            <p>{JSON.stringify(roles)}</p>
        </PageWrapper>
    );
};

export default ContactPage;
