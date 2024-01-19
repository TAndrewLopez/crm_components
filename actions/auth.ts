"use server";

import { favorite, user } from "@prisma/client";

import { db } from "@/lib/prisma";

export const getSelf = async (): Promise<
    user & {
        favorites: favorite[];
    }
> => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: 11,
            },
            include: {
                favorites: true,
            },
        });

        if (!user) throw new Error("Couldn't get self.");

        return user;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

export const getUserByUsername = async (
    username: string
): Promise<
    user & {
        favorites: favorite[];
    }
> => {
    try {
        const user = await db.user.findFirst({
            where: {
                username,
            },
            include: {
                favorites: true,
            },
        });

        if (!user) throw new Error(`User with username ${username} not found.`);

        return user;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};
