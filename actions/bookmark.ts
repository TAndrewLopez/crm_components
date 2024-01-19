"use server";

import { bookmark } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { getSelf } from "./auth";
import { getSubmissionByID } from "./submissions";

// QUERY
/**
 * Checks if the given submission_id is a bookmark record of the currently logged in user.
 * @param submission_id
 * @returns boolean
 */
export const isBookmark = async (submission_id: number): Promise<boolean> => {
    try {
        const self = await getSelf();
        const submission = await getSubmissionByID(submission_id)
        const bookmark = await db.bookmark.findFirst({
            where: {
                owner_id: self.id,
                submission_id: submission.id,
            },
        });
        return bookmark ? true : false;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

/**
 * Fetches all bookmark records for the currently logged in user.
 * @returns bookmark[]
 */
export const getBookmarks = async (): Promise<bookmark[]> => {
    try {
        const self = await getSelf();
        const bookmarks = await db.bookmark.findMany({
            where: {
                owner_id: self.id,
            },
            orderBy: {
                created_at: "desc",
            },
        });

        revalidatePath("/");
        return bookmarks;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

// MUTATION
/**
 * Creates a new bookmark record with the given label and submission_id.
 * @param label 
 * @param submission_id 
 * @returns bookmark
 */
export const addBookmark = async (
    label: string,
    submission_id: number
): Promise<bookmark> => {
    try {
        const self = await getSelf();
        const submission = await getSubmissionByID(submission_id);
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
 * Deletes a bookmark record with the given submission_id
 * @param submission_id 
 * @returns bookmark
 */
export const deleteBookmarkBySubmissionID = async (submission_id: number): Promise<bookmark> => {
    try {
        const self = await getSelf();
        const submission = await getSubmissionByID(submission_id);
        const bookmark = await db.bookmark.findFirst({
            where: {
                owner_id: self.id,
                submission_id: submission.id,
            },
        });

        if (!bookmark)
            throw new Error(`Couldn't find bookmark with id: ${submission_id}.`);

        const deletedBookmark = await db.bookmark.delete({
            where: {
                id: bookmark.id,
            },
        });

        revalidatePath("/");
        return deletedBookmark
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

/**
 * Updates the status of a bookmark record with the given submission_id
 * @param submission_id 
 * @returns bookmark
 */
export const updateBookmarkStatusBySubmissionID = async (
    submission_id: number
): Promise<bookmark> => {
    try {
        const self = await getSelf()
        const submission = await getSubmissionByID(submission_id);
        const bookmark = await db.bookmark.findFirst({
            where: {
                owner_id: self.id,
                submission_id: submission.id,
            },
        });

        if (!bookmark)
            throw new Error(`Couldn't find bookmark with id: ${submission_id}.`);

        const updatedBookmark = await db.bookmark.update({
            where: {
                id: bookmark.id,
            },
            data: {
                status: submission.status,
            },
        });

        revalidatePath("/");
        return updatedBookmark;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};