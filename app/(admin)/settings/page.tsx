import { getSelf } from "@/actions/auth";
import { PageWrapper } from "@/components/pageWrapper";
import { UserDetails } from "./_components/userDetails";
import { getContactByID } from "@/actions/contacts";

const SettingsPage = async () => {
    const self = await getSelf();
    const contact = await getContactByID(self.id);
    return (
        <PageWrapper>
            <h1 className="text-4xl font-semibold">Settings</h1>
            <UserDetails contact={contact} />
            <div className="flex flex-col gap-y-5">
                <h1 className="text-xl font-semibold">Update Contact Information.</h1>
                <div>
                    <h1 className="text-xl font-semibold">Personal Settings:</h1>
                    <p>Toggle show birthday</p>
                </div>
                <div>
                    <h1 className="text-xl font-semibold">Preferred Bookmark Sorting:</h1>
                    <p>Date Created - asc</p>
                    <p>Date Created - desc</p>
                    <p>Title - asc</p>
                    <p>Title - desc</p>
                    <p>Status - asc</p>
                    <p>Status - desc</p>
                </div>

                <div>
                    <h1 className="text-xl font-semibold">Preferred Contact Sorting:</h1>
                    <p>First Name - asc</p>
                    <p>Last Name - asc</p>
                    <p>Username - asc</p>
                    <p>Role - asc</p>
                </div>
                <div>
                    <h1 className="text-xl font-semibold">Spotify Integration:</h1>
                </div>

            </div>
        </PageWrapper>
    );
};

export default SettingsPage;
