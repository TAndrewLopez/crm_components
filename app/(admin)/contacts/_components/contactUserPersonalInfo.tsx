import { WidgetWrapper } from "@/components/widgetWrapper"
import { ContactUser } from "@/lib/types"

type Props = {
    contact: ContactUser
}

export const ContactUserPersonalInfo = ({ contact }: Props) => {
    const { birthday } = contact;

    return (
        <WidgetWrapper title="Personal Information" showSeparator>
            <div className="flex gap-x-3">
                <p>Birthday:</p>
                <p>{birthday ?? "Not Provided"}</p>
            </div>
        </WidgetWrapper>
    )
}