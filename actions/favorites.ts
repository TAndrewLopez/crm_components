"use server";

import { favorite } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { getSelf } from "./auth";
import { getSubmissionByID } from "./submissions";

// QUERY
/**
 * Checks if the given submission_id is a favorite of the currently logged in user.
 * @param submission_id
 * @returns boolean
 */
export const isFavoriteSubmission = async (submission_id: number): Promise<boolean> => {
    try {
        const self = await getSelf();
        const favorite = await db.favorite.findFirst({
            where: {
                user_id: self.id,
                submission_id,
            },
        });
        return favorite ? true : false;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

/**
 * Fetches all favorite records for the currently logged in user.
 * @returns favorite[]
 */
export const getFavoriteSubmissions = async (): Promise<favorite[]> => {
    try {
        const self = await getSelf();
        const favorites = await db.favorite.findMany({
            where: {
                user_id: self.id,
            },
            orderBy: {
                created_at: "desc",
            },
        });

        revalidatePath("/");
        return favorites;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

// MUTATION
/**
 * Creates a new favorite record with the given label and submission_id.
 * @param label 
 * @param submission_id 
 * @returns favorite
 */
export const addFavorite = async (
    label: string,
    submission_id: number
): Promise<favorite> => {
    try {
        const self = await getSelf();
        const submission = await getSubmissionByID(submission_id);
        const favorite = await db.favorite.create({
            data: {
                label,
                submission_id,
                status: submission.status,
                user_id: self.id,
            },
        });

        if (!favorite) throw new Error("Error adding favorite submission.");
        revalidatePath("/");
        return favorite;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

/**
 * Deletes record with the given favorite_id
 * @param favorite_id 
 * @returns favorite
 */
export const deleteFavoriteBySubID = async (submission_id: number): Promise<favorite> => {
    try {
        const self = await getSelf();
        const favorite = await db.favorite.findFirst({
            where: {
                submission_id,
                user_id: self.id,
            },
        });

        if (!favorite)
            throw new Error(`Couldn't find favorite with id: ${submission_id}.`);

        const deletedFavorite = await db.favorite.delete({
            where: {
                id: favorite.id,
            },
        });

        revalidatePath("/");
        return deletedFavorite
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

/**
 * Updates the status for the record with the given submission_id
 * @param submission_id 
 * @returns favorite
 */
export const updateFavoriteStatusByID = async (
    submission_id: number
): Promise<favorite> => {
    try {
        const submission = await getSubmissionByID(submission_id);

        const favorite = await db.favorite.findFirst({
            where: {
                submission_id,
            },
        });

        if (!favorite)
            throw new Error(`Couldn't find favorite with id: ${submission_id}.`);

        const updatedFavorite = await db.favorite.update({
            where: {
                id: favorite.id,
            },
            data: {
                status: submission.status,
            },
        });

        revalidatePath("/");
        return updatedFavorite;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};