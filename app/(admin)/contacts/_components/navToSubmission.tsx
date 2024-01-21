'use client'

import { submissionStatus } from "@prisma/client";
import moment from "moment";

import { StatusBadge } from "@/components/statusBadge";
import { useRouter } from "next/navigation";

type Props = {
    id: number;
    status: submissionStatus
    created_at: Date
}

export const NavToSubmission = ({ created_at, id, status }: Props) => {
    const router = useRouter()

    return (
        <button
            onClick={() => router.push(`/submissions/${id}`)}
            className="flex gap-x-3 bg-primary-foreground hover:bg-primary-foreground/50 p-4 rounded-md" key={id}>
            <StatusBadge status={status} />
            Created {moment(created_at).fromNow()}
        </button>
    )
}