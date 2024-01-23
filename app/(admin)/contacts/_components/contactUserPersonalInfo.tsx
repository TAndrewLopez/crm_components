import { WidgetWrapper } from "@/components/widgetWrapper";
import { ContactUser } from "@/lib/types";
import { hasShowBirthday } from "@/lib/utils";

type Props = {
    contact: ContactUser;
};

export const ContactUserPersonalInfo = ({ contact }: Props) => {
    const { birthday, profile_settings } = contact;
    const showBirthday = hasShowBirthday(profile_settings);
    const birthdayLabel = birthday ?? "Not Provided"

    return (
        <WidgetWrapper title="Personal Information" showSeparator>
            <div className="flex gap-x-3">
                <p>Birthday:</p>
                {showBirthday ? birthdayLabel : "Not Provided"}
            </div>
        </WidgetWrapper>
    );
};
