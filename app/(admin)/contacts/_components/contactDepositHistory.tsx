import { WidgetWrapper } from "@/components/widgetWrapper"
import { ContactUser } from "@/lib/types"

type Props = {
    contact: ContactUser
}

export const ContactDepositHistory = ({ contact }: Props) => {
    return (
        <WidgetWrapper title="Deposit History" showSeparator>
            <div className="flex flex-col gap-y-2 h-64 xl:h-64 overflow-y-auto">
                {contact.deposits.map(deposit => (
                    <div key={deposit.id}>
                        {deposit.amount}
                    </div>
                ))}
            </div>
        </WidgetWrapper>
    )
}