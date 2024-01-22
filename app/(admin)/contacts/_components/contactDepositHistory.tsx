import { WidgetWrapper } from "@/components/widgetWrapper"
import { ContactUser } from "@/lib/types"

type Props = {
    contact: ContactUser
}

export const ContactDepositHistory = ({ contact }: Props) => {
    const { deposits } = contact;
    return (
        <WidgetWrapper title="Deposit History" showSeparator>
            <div className="flex flex-col gap-y-2 max-h-64 overflow-y-auto">
                {deposits.map((deposit) => {
                    const { id, status, amount, created_at } = deposit
                    return (
                        <div
                            className="flex gap-x-3 bg-primary-foreground p-4 rounded-md" key={id}>
                            <p className='hidden sm:flex items-center text-sm capitalize'>
                                ${amount} Deposit {status} on {created_at.toLocaleDateString()}
                            </p>
                        </div>
                    )
                })}
                {!deposits.length && "No Deposit History"}
            </div>
        </WidgetWrapper>
    )
}