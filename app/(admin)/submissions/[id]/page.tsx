'use client'

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

const SingleSubmission = () => {
    const router = useRouter()
    const { id } = useParams()
    return (
        <div>
            <Button onClick={() => router.back()} variant='outline'>
                Back
            </Button>

            ID: {id}
        </div>
    )
}

export default SingleSubmission;