'use client'

import { submission } from "@prisma/client";
import { CircleUser } from "lucide-react";

import { Separator } from "@/components/separator";
import { StatusBadge } from "@/components/statusBadge";
import { BookmarkToggle } from "./bookmarkToggle";
import { BackButton } from "./backButton";
import { useRouter } from "next/navigation";

type Props = {
    isBookmark: boolean;
    submission: submission;
};

export const ContactHeader = ({ isBookmark, submission }: Props) => {
    const router = useRouter();

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-y-3 sm:gap-y-0 sm:gap-x-3">
                <BackButton />
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-x-3">
                        <CircleUser className="hidden md:block md:w-10 md:h-10 xl:w-12 xl:h-12" />
                        <div className="flex items-center sm:gap-x-5">
                            <div className="flex flex-col justify-between">
                                <p className="font-thin text-2xl max-w-48 sm:max-w-72 2xl:max-w-fit truncate">
                                    {submission.name}
                                </p>
                            </div>
                            <div className="flex items-center space-x-1.5">
                                {submission.author_id && (
                                    <button onClick={() => router.push('/contacts')}>
                                        <StatusBadge status="contact" />
                                    </button>
                                )}
                                <StatusBadge status={submission.status} />
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
