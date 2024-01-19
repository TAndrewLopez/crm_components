"use server";

import { submission } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { updateFavoriteStatusByID } from "./favorites";
import { getSelf } from "./auth";

// QUERIES
export const getSubmissions = async (): Promise<submission[]> => {
    try {
        return await db.submission.findMany();
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

export const getSubmissionByID = async (id: number): Promise<submission> => {
    try {
        const submission = await db.submission.findUnique({
            where: {
                id,
            },
            include: {
                author: true,
            },
        });

        if (!submission)
            throw new Error(`Couldn't find a submission with submission_id: ${id}.`);

        return submission;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

export const checkSubmissionStatusByID = async (
    id: number
): Promise<boolean> => {
    const submission = await getSubmissionByID(id);
    return submission.status === "new" ? false : true;
};

// MUTATIONS
export const markSubAsRead = async (id: number): Promise<submission> => {
    try {
        const self = await getSelf();
        const submission = await getSubmissionByID(id);

        if (submission.status === "read")
            throw new Error("Submission is already marked as read.");

        const updatedSub = await db.submission.update({
            where: {
                id: submission.id,
            },
            data: {
                status: "read",
            },
        });

        const isFavorite = self.favorites.some((fav) => self.id === fav.user_id);

        if (isFavorite) {
            await updateFavoriteStatusByID(updatedSub.id);
        }

        revalidatePath("/");
        return updatedSub;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

export const markSubAsUnread = async (id: number): Promise<submission> => {
    try {
        const self = await getSelf();
        const submission = await getSubmissionByID(id);

        if (submission.status === "read")
            throw new Error("Submission is already marked as read.");

        const updatedSub = await db.submission.update({
            where: {
                id: submission.id,
            },
            data: {
                status: "new",
            },
        });

        const isFavorite = self.favorites.some((fav) => self.id === fav.user_id);

        if (isFavorite) {
            await updateFavoriteStatusByID(updatedSub.id);
        }

        revalidatePath("/");
        return updatedSub;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

export const markGivenSubsAsRead = async (ids: number[]): Promise<void> => {
    for (const id of ids) {
        try {
            await db.submission.update({
                where: {
                    id,
                },
                data: {
                    status: "read",
                },
            });

            revalidatePath("/");
        } catch (error) {
            throw new Error("Internal Error.");
        }
    }
};
export const markGivenSubsAsUnread = async (ids: number[]): Promise<void> => {
    for (const id of ids) {
        try {
            await db.submission.update({
                where: {
                    id,
                },
                data: {
                    status: "new",
                },
            });
            revalidatePath("/");
        } catch (error) {
            throw new Error("Internal Error.");
        }
    }
};
