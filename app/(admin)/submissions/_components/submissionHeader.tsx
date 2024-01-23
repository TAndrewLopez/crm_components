"use client";

import { submission } from "@prisma/client";
import { CircleUser } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Separator } from "@/components/separator";
import { SubStatusBadge } from "@/components/subStatusBadge";
import { BookmarkToggle } from "./bookmarkToggle";
import { BackButton } from "./backButton";
import { useContacts } from "@/store/useContacts";
import { BreadCrumbs } from "@/components/breadCrumbs";

type Props = {
    isBookmark: boolean;
    submission: submission;
};

export const SubmissionHeader = ({ isBookmark, submission }: Props) => {
    const router = useRouter();
    const pathname = usePathname().split("/");
    const crumbs = [...pathname.slice(0, -1), submission.name];
    const { setSelectedContactID } = useContacts();

    const handleClick = () => {
        router.push("/contacts");
        setSelectedContactID(submission.user_id);
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col gap-y-3">
                <div className="flex items-center gap-x-3">
                    <BackButton />
                    <BreadCrumbs crumbs={crumbs} />
                </div>

                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-x-3">
                        <CircleUser className="hidden sm:block sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                        <div className="flex items-center gap-x-2 sm:gap-x-5">
                            <div className="flex flex-col justify-between">
                                <p className="font-thin text-2xl max-w-48 sm:max-w-72 2xl:max-w-fit truncate">
                                    {submission.name}
                                </p>
                            </div>
                            <div className="flex items-center space-x-1.5">
                                {submission.user_id && (
                                    <button onClick={handleClick}>
                                        <SubStatusBadge status="contact" />
                                    </button>
                                )}
                                <SubStatusBadge status={submission.status} />
                            </div>
                        </div>
                    </div>

                    <BookmarkToggle
                        isBookmark={isBookmark}
                        submission_id={submission.id}
                    />
                </div>
            </div>
            <Separator className="bg-white/40 h-0.5 mt-2" />
        </div>
    );
};
