"use server";

import { db } from "@/lib/prisma";
import { submission, user } from "@prisma/client";
import { revalidatePath } from "next/cache";

// QUERIES
export const getSubmissionByID = async (
    id: number
): Promise<submission | null> => {
    try {
        return await db.submission.findUnique({
            where: {
                id,
            },
            include: {
                author: true,
            },
        });
    } catch (error) {
        console.log("Something went wrong", error);
        return null;
    }
};

export const checkSubmissionViewStatusByID = async (
    id: number
): Promise<boolean> => {
    const submission = await getSubmissionByID(id);
    if (!submission) throw new Error("Invalid Submission ID.");
    return submission.status === "read" ? true : false;
};

// MUTATIONS
export const markSubAsRead = async (id: number): Promise<submission | null> => {
    try {
        const submission = await getSubmissionByID(id);

        if (!submission) throw new Error("Invalid Submission ID.");
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

        revalidatePath("/");
        return updatedSub;
    } catch (error) {
        console.log("Something went wrong", error);
        return null;
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
            console.log("Something went wrong", error);
        }
    }
};

export const markSubAsUnread = async (
    id: number
): Promise<submission | null> => {
    try {
        const sub = await getSubmissionByID(id);

        if (!sub) throw new Error("Invalid Submission ID.");
        if (sub.status === "unread")
            throw new Error("Submission is already marked as unread.");

        const updatedSub = await db.submission.update({
            where: {
                id: sub.id,
            },
            data: {
                status: "unread",
            },
        });

        revalidatePath("/");
        return updatedSub;
    } catch (error) {
        console.log("Something went wrong", error);
        return null;
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
                    status: "unread",
                },
            });
            revalidatePath("/");
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }
};
