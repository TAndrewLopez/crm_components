import type { Metadata } from "next";

import { getSelf } from "@/actions/auth";
import { getContactByID } from "@/actions/contacts";
import { PageWrapper } from "@/components/pageWrapper";
import { WidgetWrapper } from "@/components/widgetWrapper";
import { convertSettingString } from "@/lib/utils";
import { ProfileSettings } from '@/lib/types';


export const metadata: Metadata = {
    title: "Settings",
};

const SettingsPage = async () => {
    const self = await getSelf();
    const contact = await getContactByID(self.id);
    const settings: ProfileSettings = convertSettingString(self.profile_settings)

    return (
        <PageWrapper className="flex flex-col gap-y-5 font-extralight p-4">
            <h1 className="text-4xl font-semibold">Settings</h1>
            {/* <UserDetails contact={contact} /> */}
            <div className="flex-1 flex flex-col gap-y-5">
                <h1 className="text-xl font-semibold">Update Contact Information.</h1>
                {/* <PersonalSettings settings={settings} />
                <BookmarkSettings settings={settings} />
                <ContactSettings settings={settings} /> */}
                {/* <UserSortingSettings /> */}
                <WidgetWrapper title="Spotify Integration:" showSeparator>
                    <p className="font-bold text-emerald-500">Pending Integration ...</p>
                </WidgetWrapper>
            </div>
        </PageWrapper>
    );
};

export default SettingsPage;
