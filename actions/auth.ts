"use server";

import { bookmark, user } from "@prisma/client";

import { db } from "@/lib/prisma";

interface ExtendedUser extends user {
    bookmarks: bookmark[];
}

/**
 * DEV IMPLEMENTATION -> RETURN USER WITH MY ID
 * @returns ExtendedUser
 */
export const getSelf = async (): Promise<ExtendedUser> => {
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
/**
 * Fetches a user from the database by the given username.
 * @param username 
 * @returns ExtendedUser
 */
export const getUserByUsername = async (
    username: string
): Promise<ExtendedUser> => {
    try {
        const user = await db.user.findFirst({
            where: {
                username,
            },
            include: {
                bookmarks: true,
            },
        });

        if (!user) throw new Error(`User with username ${username} not found.`);

        return user;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};
