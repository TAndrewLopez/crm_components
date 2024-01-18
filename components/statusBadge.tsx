import { submissionStatus } from "@prisma/client";

import { Badge } from "./ui/badge";

export const StatusBadge = ({ status }: { status: submissionStatus }) => {
    switch (status) {
        case "new":
            return (
                <>
                    <Badge variant="primary" className="hidden xl:block">
                        New
                    </Badge>
                    <Badge
                        variant="primary"
                        className="xl:hidden rounded-full h-5"></Badge>
                </>
            );
        case "current":
            return (
                <>
                    <Badge variant="primary" className="hidden xl:block">
                        Current
                    </Badge>
                    <Badge
                        variant="primary"
                        className="xl:hidden rounded-full h-5"></Badge>
                </>
            );
        case "pending":
            return (
                <>
                    <Badge variant="highlight" className="hidden xl:block">
                        Pending
                    </Badge>
                    <Badge
                        variant="highlight"
                        className="xl:hidden rounded-full h-5"></Badge>
                </>
            );
        case "urgent":
            return (
                <>
                    <Badge variant="destructive" className="hidden xl:block">
                        Urgent
                    </Badge>
                    <Badge
                        variant="destructive"
                        className="xl:hidden rounded-full h-5"></Badge>
                </>
            );
        case "closed":
            return (
                <>
                    <Badge variant="grey" className="hidden xl:block">
                        Closed
                    </Badge>
                    <Badge variant="grey" className="xl:hidden rounded-full h-5"></Badge>
                </>
            );
        case "read":
            return (
                <>
                    <Badge variant="invisible" />
                </>
            );

        default:
            return null
    }
};