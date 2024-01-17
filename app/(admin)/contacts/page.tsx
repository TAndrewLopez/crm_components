import {
    getAllAdmins,
    getAllClients,
    getAllDevelopers,
    getAllRolesWithCount,
} from "@/actions/contacts";
import { PageWrapper } from "@/components/pageWrapper";

const ContactPage = async () => {
    const clients = await getAllClients();
    const admins = await getAllAdmins();
    const developers = await getAllDevelopers();
    const roles = await getAllRolesWithCount();

    return (
        <PageWrapper className="flex flex-col gap-y-5">
            <p>{JSON.stringify(roles)}</p>
            <p>{JSON.stringify(clients)}</p>
            <p>{JSON.stringify(admins)}</p>
            <p>{JSON.stringify(developers)}</p>
        </PageWrapper>
    );
};

export default ContactPage;
