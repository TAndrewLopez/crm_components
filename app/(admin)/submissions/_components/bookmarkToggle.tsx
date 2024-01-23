"use client";

import { Bookmark } from "lucide-react";
import { useState, useTransition } from "react";

import { cn } from "@/lib/utils";
import { BookmarkForm } from "./bookmarkForm";
import { deleteBookmarkBySubmissionID } from "@/actions/bookmarks";

type Props = {
    isBookmark: boolean;
    submission_id: number;
};

export const BookmarkToggle = ({ isBookmark, submission_id }: Props) => {
    const [isPending, startTransition] = useTransition();
    const [showLabel, setShowLabel] = useState(false);

    const handleClick = () => {
        isBookmark
            ? startTransition(() => {
                deleteBookmarkBySubmissionID(submission_id)
                    .then((data) => {
                        setShowLabel(false);
                    })
                    .catch(() =>
                        console.error("Something went wrong updating bookmark")
                    );
            })
            : setShowLabel(true);
    };

    return (
        <div className="flex gap-x-3 items-center relative">
            {showLabel && (
                <BookmarkForm
                    className="flex flex-col 2xl:flex-row gap-x-3 border border-primary/30 2xl:border-none absolute 2xl:static 2xl:flex right-0 top-11 bg-popover 2xl:bg-inherit p-4 2xl:p-0"
                    submission_id={submission_id}
                    setShowLabel={setShowLabel}
                />
            )}
            <Bookmark
                onClick={handleClick}
                className={cn(
                    "h-8 w-8 text-emerald-500 hover:cursor-pointer hover:text-white",
                    isBookmark && "fill-emerald-500"
                )}
            />
        </div>
    );
};
