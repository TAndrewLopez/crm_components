import { submission } from "@prisma/client";
import { CircleUser } from "lucide-react";

import { StatusBadge } from "@/components/statusBadge";
import { Badge } from "@/components/ui/badge";
import { BookmarkToggle } from "./bookmarkToggle";

type Props = {
    isBookmark: boolean
    submission: submission;
};

export const ContactHeader = async ({ isBookmark, submission }: Props) => {

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3 mb-2">
                    <CircleUser className="w-12 h-12" />
                    <div className="flex items-end gap-x-5">
                        <div className="flex flex-col justify-between">
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
                <div className="flex gap-x-3">
                    <BookmarkToggle isBookmark={isBookmark} submission_id={submission.id} />
                </div>
            </div>
            <hr className="bg-white/40 h-0.5" />
        </div>
    );
};
