import { getSelf } from "@/actions/auth";
import { PageWrapper } from "@/components/pageWrapper";
import { UserDetails } from "./_components/userDetails";
import { getContactByID } from "@/actions/contacts";
import { BookmarkSettings } from "./_components/bookmarkSettings";
import { ContactSettings } from "./_components/contactSettings";
import { WidgetWrapper } from "@/components/widgetWrapper";
import { PersonalSettings } from "./_components/personalSettings";

const SettingsPage = async () => {
    const self = await getSelf();
    const contact = await getContactByID(self.id);
    return (
        <PageWrapper className="flex flex-col gap-y-5 font-extralight">
            <h1 className="text-4xl font-semibold">Settings</h1>
            <UserDetails contact={contact} />
            <div className="flex-1 flex flex-col gap-y-5">
                <h1 className="text-xl font-semibold">Update Contact Information.</h1>
                <PersonalSettings />
                <BookmarkSettings />
                <ContactSettings />

                <WidgetWrapper title="Spotify Integration:" showSeparator>
                    Pending Integration
                </WidgetWrapper>

            </div>
        </PageWrapper>
    );
};

export default SettingsPage;
