"use client";

import { Bookmark } from "lucide-react";

import { addBookmark, deleteBookmarkBySubmissionID } from "@/actions/bookmark";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";

type Props = {
    isBookmark: boolean;
    submission_id: number;
};

export const BookmarkToggle = ({ isBookmark, submission_id }: Props) => {
    const defaultStyles =
        "w-6 h-6 text-emerald-500 hover:text-white cursor-pointer";

    const addAsBookmark = async () => {
        await addBookmark("new favorite", submission_id);
    };

    const removeAsBookmark = async () => {
        await deleteBookmarkBySubmissionID(submission_id);
    };

    const handleSubmit = (e: FormEvent<HTMLElement>) => {
        e.preventDefault()
        console.log('things')
    }

    return (
        <div className="flex items-center bg-red-200/20">
            <form onSubmit={handleSubmit}>
                <Input placeholder="Name of bookmark" className="" />
            </form>

            <Button
                onClick={isBookmark ? removeAsBookmark : addAsBookmark}
                variant="link">
                <Bookmark className={cn(defaultStyles,
                    isBookmark && "fill-emerald-500")} />
            </Button>
        </div>
    );
};
