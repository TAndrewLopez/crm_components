import { WidgetWrapper } from "@/components/widgetWrapper"
import { ContactUser } from "@/lib/types"
import { formatToUSNumber } from "@/lib/utils"

type Props = {
    contact: ContactUser
}

export const ContactUserInformation = ({ contact }: Props) => {
    return (
        <WidgetWrapper title="Contact Information" showSeparator>
            <div className="flex gap-x-3">
                <p>Phone Number:</p>
                <p>{formatToUSNumber(contact.phone_number)}</p>
            </div>
            <div className="flex gap-x-3">
                <p>Email</p>
                <p>{contact.email}</p>
            </div>
        </WidgetWrapper>
    )
}