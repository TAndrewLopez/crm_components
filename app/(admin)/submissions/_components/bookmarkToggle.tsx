"use client";

import { Bookmark } from "lucide-react";

import { addFavorite, deleteFavoriteBySubID } from "@/actions/favorites";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
    isBookmark: boolean;
    submission_id: number;
};

export const BookmarkToggle = ({ isBookmark, submission_id }: Props) => {
    const defaultStyles =
        "w-6 h-6 text-emerald-500 hover:text-white cursor-pointer";

    const addAsBookmark = async () => {
        await addFavorite("new favorite", submission_id);
    };

    const removeAsBookmark = async () => {
        await deleteFavoriteBySubID(submission_id);
    };

    return (
        <Button
            onClick={isBookmark ? removeAsBookmark : addAsBookmark}
            variant="link">
            <Bookmark className={cn(defaultStyles,
                isBookmark && "fill-emerald-500")} />
        </Button>
    );
};
