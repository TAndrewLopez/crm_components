'use client'

import { submissionStatus } from "@prisma/client";
import { Link2 } from 'lucide-react';
import moment from "moment";
import { useRouter } from "next/navigation";

import { StatusBadge } from "@/components/statusBadge";

type Props = {
    id: number;
    status: submissionStatus
    created_at: Date
}

export const ContactHistoryItem = ({ created_at, id, status }: Props) => {
    const router = useRouter()

    return (
        <button
            onClick={() => router.push(`/submissions/${id}`)}
            className="flex items-center justify-between gap-x-3 bg-primary-foreground hover:bg-primary-foreground/50 p-4 rounded-md" key={id}>
            <div className='flex gap-x-3'>
                <StatusBadge status={status} />
                <p className='hidden sm:flex items-center text-sm'>
                    Created {moment(created_at).fromNow()}
                </p>
            </div>
            <Link2 />
        </button>
    )
}