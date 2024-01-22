import { WidgetWrapper } from "@/components/widgetWrapper"
import { ContactHistoryItem } from "./contactHistoryItem"
import { ContactUser } from "@/lib/types"

type Props = {
    contact: ContactUser
}

export const ContactSubHistory = ({ contact }: Props) => {
    return (
        <WidgetWrapper title="Submission History" showSeparator>
            <div className="flex flex-col gap-y-2 max-h-64 xl:h-64 overflow-y-auto">
                {contact.submissions.map((sub) => (
                    <ContactHistoryItem
                        id={sub.id}
                        status={sub.status}
                        created_at={sub.created_at}
                        key={sub.id}
                    />
                ))}
            </div>
        </WidgetWrapper>
    )
}