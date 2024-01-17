'use server'

import { db } from "@/lib/prisma";

// QUERIES
export const getUnreadSubCount = async () => {
    return await db.submission.count({
        where: {
            status: "unread",
        },
    });
};

export const getTotalContactCount = async () => {
    return await db.user.count()
}

// MUTATIONS
