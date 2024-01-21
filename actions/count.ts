'use server'

import { db } from "@/lib/prisma";

/*
    These counts are used for the nav bar notification count.
*/

export const getUnreadSubCount = async (): Promise<number> => {
    try {
        return await db.submission.count({
            where: {
                status: "new",
            },
        });
    } catch (error) {
        throw new Error("Internal Error.")
    }
};

export const getTotalContactCount = async (): Promise<number> => {
    try {
        return await db.user.count()
    } catch (error) {
        throw new Error("Internal Error.")
    }
}