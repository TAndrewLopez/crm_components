import { getAllRolesWithCount } from "@/actions/contacts";
import { PageWrapper } from "@/components/pageWrapper";

const ContactPage = async () => {
    const roles = await getAllRolesWithCount();

    return (
        <PageWrapper className="flex flex-col gap-y-5 font-extralight">
            <p>{JSON.stringify(roles)}</p>
        </PageWrapper>
    );
};

export default ContactPage;
