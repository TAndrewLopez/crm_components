'use client'

import { submission } from "@prisma/client";
import { CircleUser } from "lucide-react";
import { useRouter } from "next/navigation";

import { Separator } from "@/components/separator";
import { SubStatusBadge } from "@/components/subStatusBadge";
import { BookmarkToggle } from "./bookmarkToggle";
import { BackButton } from "./backButton";
import { useContacts } from "@/store/useContacts";
import Link from "next/link";

type Props = {
    isBookmark: boolean;
    submission: submission;
};

export const ContactHeader = ({ isBookmark, submission }: Props) => {
    const router = useRouter();
    const { setSelectedContactID } = useContacts()

    const handleClick = () => {
        router.push('/contacts')
        setSelectedContactID(submission.user_id)
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-y-3 sm:gap-y-0 sm:gap-x-3">
                <div className="flex items-center gap-x-3">
                    <BackButton />
                    <Link href='/submissions' className="text-sm">
                        / <span className="text-emerald-500 font-semibold hover:underline underline-offset-4">
                            submissions
                        </span>
                    </Link>
                </div>

                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-x-3">
                        <CircleUser className="hidden md:block md:w-10 md:h-10 xl:w-12 xl:h-12" />
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
