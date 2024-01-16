'use server'

import { db } from "@/lib/prisma";

export const getUnreadSubCount = async () => {
    return await db.submission.count({
        where: {
            status: "unread",
        },
    });
};
