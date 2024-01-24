import { UserProfileDetailsSkeleton } from "./_components/userProfileDetails"
import { UserProfileSettingsSkeleton } from "./_components/userProfileSettings"

const SettingsLoadingPage = () => {
    return (
        <div className="flex flex-col gap-y-5 py-4">
            <UserProfileDetailsSkeleton />
            <UserProfileSettingsSkeleton />
        </div>
    )
}
export default SettingsLoadingPage