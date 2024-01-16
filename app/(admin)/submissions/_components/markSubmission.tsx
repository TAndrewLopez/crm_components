import { markSubAsRead, markSubAsUnread } from "@/actions/submission";
import { Button } from "@/components/ui/button";

type Props = {
    id: number;
    status: 'unread' | 'read'
}

export const MarkSubmission = ({ id, status }: Props) => {

    const handleClick = status === 'unread' ? markSubAsRead : markSubAsUnread
    return (
        <Button variant='link' onClick={() => handleClick(id)}>
            {status}
        </Button>
    )
}