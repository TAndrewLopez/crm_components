import { WidgetWrapper } from "@/components/widgetWrapper"
import { ContactHistoryItem } from "./contactHistoryItem"
import { ContactUser } from "@/lib/types"

type Props = {
    contact: ContactUser
}

export const ContactSubHistory = ({ contact }: Props) => {
    return (
        <WidgetWrapper title="Submission History" showSeparator>
            {contact.submissions.map((sub) => (
                <ContactHistoryItem
                    id={sub.id}
                    status={sub.status}
                    created_at={sub.created_at}
                    key={sub.id}
                />
            ))}
        </WidgetWrapper>
    )
}