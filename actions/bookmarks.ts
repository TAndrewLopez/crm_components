"use server";

import { bookmark, submissionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/prisma";
import { newBookmarkSchema } from "@/schemas";
import { getSelf } from "./auth";
import { getSubmissionByID } from "./submissions";
import { convertSettingsString } from "@/lib/utils";

// BOOLEANS

/**
 *  Check if the given submission_id is a bookmark record of the logged in user.
 *  @param submission_id
 *  @returns boolean
 */
export const isBookmark = async (submission_id: number): Promise<boolean> => {
    try {
        const selfPromise = getSelf();
        const submissionPromise = getSubmissionByID(submission_id);
        const [self, submission] = await Promise.all([
            selfPromise,
            submissionPromise,
        ]);

        const bookmark = await db.bookmark.findFirst({
            where: {
                owner_id: self.id,
                submission_id: submission.id,
            },
            select: {
                id: true
            }
        });

        return bookmark ? true : false;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

// QUERIES

/**
 * Fetch all of the logged in user's bookmark records. Revalidate Path: '/'
 * @returns bookmark[]
 */
export const getBookmarks = async (): Promise<bookmark[]> => {
    try {
        const self = await getSelf();
        const { bookmarkSortOption, bookmarkSortDir } = convertSettingsString(
            self.profile_settings
        );

        const bookmarks = await db.bookmark.findMany({
            where: {
                owner_id: self.id,
            },
            orderBy: {
                [bookmarkSortOption]: bookmarkSortDir,
            },
        });

        revalidatePath("/");
        return bookmarks;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

// MUTATIONS

/**
 * Create a new bookmark record for the logged in user with the given label and submission_id. Revalidate Path: '/'
 * @param label
 * @param submission_id
 * @returns bookmark
 */
export const addBookmark = async (
    values: z.infer<typeof newBookmarkSchema>
): Promise<bookmark> => {
    try {
        const validatedFields = newBookmarkSchema.safeParse(values);
        if (!validatedFields.success) throw new Error("Invalid Fields.");
        const { label, submission_id } = validatedFields.data;

        const selfPromise = getSelf();
        const submissionPromise = getSubmissionByID(submission_id);
        const [self, submission] = await Promise.all([
            selfPromise,
            submissionPromise,
        ]);

        const bookmark = await db.bookmark.create({
            data: {
                owner_id: self.id,
                label,
                submission_id: submission.id,
                status: submission.status,
            },
        });

        if (!bookmark) throw new Error("Error adding favorite submission.");

        revalidatePath("/");
        return bookmark;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

/**
 * Delete the logged in user's bookmark with the given submission_id. Revalidate Path: '/'.
 * @param submission_id
 * @returns bookmark
 */
export const deleteBookmarkBySubmissionID = async (
    submission_id: number
): Promise<bookmark> => {
    try {
        const selfPromise = getSelf();
        const submissionPromise = getSubmissionByID(submission_id);
        const [self, submission] = await Promise.all([
            selfPromise,
            submissionPromise,
        ]);

        const bookmark = await db.bookmark.findFirst({
            where: {
                owner_id: self.id,
                submission_id: submission.id,
            },
        });

        if (!bookmark)
            throw new Error(
                `Couldn't find bookmark with submission_id: ${submission_id}.`
            );

        const deletedBookmark = await db.bookmark.delete({
            where: {
                id: bookmark.id,
            },
        });

        revalidatePath("/");
        return deletedBookmark;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

// SIDE EFFECTS
/**
 *  Update the logged in user's bookmark status with the given bookmark_id. This is used as a side effect for when a user visit a 'new' submission. If they have it as a bookmark, it will that status. Revalidate Path: '/'
 * @param bookmark_id
 * @returns bookmark
 */
export const updateBookmarkStatusBySubmissionID = async (
    bookmark_id: number,
    status: submissionStatus
): Promise<bookmark> => {
    try {
        const self = await getSelf();
        const bookmark = await db.bookmark.findFirst({
            where: {
                id: bookmark_id,
            },
        });

        if (!bookmark) {
            throw new Error(
                `Couldn't find bookmark with bookmark_id: ${bookmark_id}.`
            );
        }

        const updatedBookmark = await db.bookmark.update({
            where: {
                id: bookmark.id,
            },
            data: {
                status,
            },
        });

        revalidatePath("/");
        return updatedBookmark;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};
