import { CircleUser } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { submission, submissionStatus } from "@prisma/client";

type Props = {
    submission: submission;
};

export const ContactHeader = ({ submission }: Props) => {
    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-x-3 mb-2">
                <CircleUser className="w-12 h-12" />
                <div className="flex items-end gap-x-5">
                    <div className="flex flex-col justify-between">
                        <p className="font-extralight">Contact</p>
                        <p className="font-thin text-2xl">{submission.name}</p>
                    </div>
                    <div className="flex items-center pb-1.5 space-x-1.5">
                        {submission.author_id && (
                            <>
                                <Badge variant="default" className="hidden xl:block">
                                    Contact
                                </Badge>
                                <Badge
                                    variant="default"
                                    className="xl:hidden rounded-full h-5"></Badge>
                            </>
                        )}
                        <StatusBadge status={submission.status} />
                    </div>
                </div>
            </div>
            <hr className="bg-white/40 h-0.5" />
        </div>
    );
};

const StatusBadge = ({ status }: { status: submissionStatus }) => {
    switch (status) {
        case "new":
            return (
                <>
                    <Badge variant="primary" className="hidden xl:block">
                        New
                    </Badge>
                    <Badge variant="primary" className="xl:hidden rounded-full h-5"></Badge>
                </>
            );
        case "pending":
            return (
                <>
                    <Badge variant="highlight" className="hidden xl:block">
                        Pending
                    </Badge>
                    <Badge variant="highlight" className="xl:hidden rounded-full h-5"></Badge>
                </>
            );
        case "urgent":
            return (
                <>
                    <Badge variant="destructive" className="hidden xl:block">
                        Urgent
                    </Badge>
                    <Badge variant="destructive" className="xl:hidden rounded-full h-5"></Badge>
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
        default:
            return <></>
    }
};
