'use server'

import { db } from "@/lib/prisma";

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

export const getAdminContactCount = async (): Promise<number> => {
    try {
        return await db.user.count({
            where: {
                NOT: [
                    { role: 'dev' }
                ]
            }
        })
    } catch (error) {
        throw new Error("Internal Error.")
    }
}
