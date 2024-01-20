import { submissionStatus as Status } from "@prisma/client";

import { Badge } from "./ui/badge";

type Props = {
    status: Status | 'contact',
};

export const StatusBadge = ({ status }: Props) => {
    let label = status !== "read" ? status : null;
    let variant:
        | "default"
        | "grey"
        | "primary"
        | "highlight"
        | "invisible"
        | "destructive"
        | null
        | undefined;

    switch (status) {
        case "closed":
            variant = "grey";
            break;
        case "new":
        case "current":
            variant = "primary";
            break;
        case "pending":
            variant = "highlight";
            break;
        case "read":
            variant = "invisible";
            break;
        case "urgent":
            variant = "destructive";
            break;
        default:
            variant = 'default'
            break;
    }

    return (
        <>
            <Badge variant={variant} className="hidden sm:block capitalize">
                {label}
            </Badge>
            <Badge variant={variant} className="sm:hidden rounded-full h-5"></Badge>
        </>
    );
};
