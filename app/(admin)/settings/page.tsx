import type { Metadata } from "next";
import { Suspense } from "react";

import { getSelf } from "@/actions/auth";
import { getContactByID } from "@/actions/contacts";
import { PageWrapper } from "@/components/pageWrapper";
import { WidgetWrapper } from "@/components/widgetWrapper";
import { convertSettingsString } from "@/lib/utils";
import { UserProfileDetails, UserProfileDetailsSkeleton } from "./_components/userProfileDetails";
import { UserSortingSettings, UserProfileSettingsSkeleton } from "./_components/userSortingSettings";
import { UserPersonalSettings } from "./_components/userPersonalSettings";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
    title: "Settings",
};

type Props = {}

const SettingsPage = async ({ }: Props) => {
    const self = await getSelf();
    const contact = await getContactByID(self.id);
    const settings = convertSettingsString(contact.profile_settings)

    return (
        <PageWrapper className="flex flex-col gap-y-5 font-extralight p-4">
            <h1 className="text-4xl font-semibold">Settings</h1>
            <Suspense fallback={<UserProfileDetailsSkeleton />}>
                <UserProfileDetails contact={contact} />
            </Suspense>
            <div className="flex-1 flex flex-col gap-y-5">
                <h1 className="text-xl font-semibold">Update Contact Information.</h1>
                {/* <UserPersonalSettings /> */}
                <Suspense fallback={<UserProfileSettingsSkeleton />}>
                    <UserSortingSettings settings={settings} />
                </Suspense>
                <WidgetWrapper title="Spotify Integration:" showSeparator>
                    <p className="font-bold text-emerald-500">Pending Integration ...</p>
                </WidgetWrapper>
            </div>
        </PageWrapper>
    );
};

export default SettingsPage;
