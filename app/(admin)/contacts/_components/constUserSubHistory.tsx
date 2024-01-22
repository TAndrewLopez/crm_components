'use client'

import { Link2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { SubStatusBadge } from "@/components/subStatusBadge"
import { WidgetWrapper } from "@/components/widgetWrapper"
import { ContactUser } from "@/lib/types"

type Props = {
    contact: ContactUser
}

export const ContactUserSubHistory = ({ contact }: Props) => {
    const router = useRouter()

    return (
        <WidgetWrapper title="Submission History" showSeparator>
            <div className="flex flex-col gap-y-2 max-h-64 overflow-y-auto">
                {contact.submissions.map(({ id, status }, i) => (
                    <button
                        onClick={() => router.push(`/submissions/${id}`)}
                        className="flex items-center justify-between gap-x-3 bg-primary-foreground hover:bg-primary-foreground/50 p-4 rounded-md group" key={id}>
                        <div className='flex gap-x-3'>
                            <SubStatusBadge status={status} />
                            <p className='flex items-center text-xs group-hover:font-bold'>
                                Appointment # {contact.submissions.length - i}
                            </p>
                        </div>
                        <Link2 />
                    </button>
                ))}

                {!contact.submissions.length && 'No Previous Submissions.'}
            </div>
        </WidgetWrapper>
    )
}


