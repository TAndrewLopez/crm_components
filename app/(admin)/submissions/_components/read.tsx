'use client'

import { setSubmissionStatus } from "@/actions/submissions";
import { submissionStatus } from "@prisma/client";
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner";

type Props = {
    status: submissionStatus;
    submission_id: number;
}

export const Read = ({ status, submission_id }: Props) => {
    const [isClient, setIsClient] = useState(false)
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        if (isClient && !isPending && status === 'new') {
            startTransition(() => {
                setSubmissionStatus(submission_id, 'read').then(() => toast.success("Submission Read.")).catch(() => toast.error("Something went wrong marking submission."))
            })
        }
    }, [status, isClient, isPending, submission_id])

    useEffect(() => {
        setIsClient(true)
    }, [])

    return <></>
}