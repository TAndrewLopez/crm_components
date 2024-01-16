'use server'

import { db } from "@/lib/prisma";
import { submission } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getSubmissionByID = async (id: number): Promise<submission | null> => {
    try {
        const submission = await db.submission.findUnique({
            where: {
                id
            }
        })
        return submission
    } catch (error) {
        console.log("Something went wrong", error);
        return null
    }
}

export const markSubAsRead = async (id: number): Promise<submission | null> => {
    try {
        const sub = await db.submission.findUnique({
            where: {
                id
            }
        })

        if (!sub) throw new Error("Invalid Submission ID.");
        if (sub.status === "read") throw new Error("Submission is already marked as read.");

        const updatedSub = await db.submission.update({
            where: {
                id: sub.id,
            },
            data: {
                status: "read",
            },
        });

        revalidatePath('/')
        return updatedSub;
    } catch (error) {
        console.log("Something went wrong", error);
        return null;
    }
};

export const markSubAsUnread = async (id: number): Promise<submission | null> => {
    try {
        const sub = await getSubmissionByID(id);

        if (!sub) throw new Error("Invalid Submission ID.");
        if (sub.status === "unread") throw new Error("Submission is already marked as unread.");

        const updatedSub = await db.submission.update({
            where: {
                id: sub.id,
            },
            data: {
                status: "unread"
            }
        })

        revalidatePath('/')
        return updatedSub;
    } catch (error) {
        console.log("Something went wrong", error);
        return null;
    }
};