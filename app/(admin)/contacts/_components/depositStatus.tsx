import { Badge } from "@/components/ui/badge";
import { depositStatus } from "@prisma/client";

export const DepositStatus = ({ status }: { status: depositStatus }) => {
    let variant:
        | "default"
        | "grey"
        | "primary"
        | "highlight"
        | "invisible"
        | "destructive"
        | "outlinePrimary"
        | null
        | undefined;

    switch (status) {
        case "paid":
            variant = "primary";
            break;
        case "unpaid":
            variant = "destructive";
            break;
        default:
            break;
    }

    return (
        <>
            <Badge variant={variant} className="hidden sm:block capitalize">
                {status}
            </Badge>
            <Badge variant={variant} className="sm:hidden rounded-full h-5" />
        </>
    );
};
