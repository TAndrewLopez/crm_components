'use server'

import { db } from "@/lib/prisma";

// QUERIES
export const getUnreadSubCount = async (): Promise<number> => {
    return await db.submission.count({
        where: {
            status: "unread",
        },
    });
};

export const getTotalContactCount = async (): Promise<number> => {
    return await db.user.count()
}

// MUTATIONS
