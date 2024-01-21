"use server";

import { db } from "@/lib/prisma";
import { AuthUser } from "@/lib/types";

/**
 *  DEV IMPLEMENTATION -> RETURN USER WITH MY ID
 *  @returns AuthUser
 */
export const getSelf = async (): Promise<AuthUser> => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: 11,
            },
            include: {
                bookmarks: true,
            },
        });

        if (!user) throw new Error("Couldn't get self.");

        return user;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};