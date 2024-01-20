"use server";

import { role, user } from "@prisma/client";

import { db } from "@/lib/prisma";
import { getSelf } from "./auth";

//QUERIES
export const getUsersByRole = async (role: role): Promise<user[]> => {
    try {
        const users = await db.user.findMany({
            where: {
                role,
            },
        });

        if (!users) throw new Error(`Couldn't get users with role: ${role}.`);

        return users;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

/**
 *  Fetches all contacts from the database that is not the current user. In the future this will only return the appropriate contacts based on the user role.
 */
export const getContacts = async (): Promise<user[]> => {
    try {
        const self = await getSelf();
        const contacts = await db.user.findMany({
            where: {
                NOT: [
                    {
                        id: self.id,
                    },
                    {
                        role: "dev",
                    },
                ],
            },
            orderBy: {
                username: "asc",
            },
        });
        return contacts;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};
