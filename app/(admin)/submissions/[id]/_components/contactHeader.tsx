import { CircleUser, Bookmark } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { submission } from "@prisma/client";
import { StatusBadge } from "@/components/statusBadge";
import { getFavoriteSubmissionsByUserID } from "@/actions/favorites";
import { getUserByUsername } from "@/actions/auth";

type Props = {
    submission: submission;
};

export const ContactHeader = async ({ submission }: Props) => {
    const user = await getUserByUsername('tandrewlopez')
    const favorites = await getFavoriteSubmissionsByUserID(user.id)


    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center">
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
                <div className="flex gap-x-3">
                    <Bookmark className="w-6 h-6 text-emerald-500 fill-emerald-500 hover:text-white cursor-pointer" />
                    <Bookmark className="w-6 h-6 text-emerald-500 hover:text-white  cursor-pointer" />
                </div>
            </div>
            <hr className="bg-white/40 h-0.5" />
        </div>
    );
};
