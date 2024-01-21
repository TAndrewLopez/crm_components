"use server";

import { role, submission, user } from "@prisma/client";

import { db } from "@/lib/prisma";
import { getSelf } from "./auth";
import { getSubmissionsByAuthorID } from "./submissions";

//QUERIES
export const getContactRoles = async (role: role): Promise<user[]> => {
    try {
        const contacts = await db.user.findMany({
            where: {
                role,
            },
        });

        if (!contacts) throw new Error(`Couldn't get users with role: ${role}.`);

        return contacts;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

/**
 *  Fetches all contacts that are not the logged in user.
 *  
 *  In the future this will only return the appropriate contacts based on the user role.
 *  ie client and admins shouldn't have dev contact info but owners of the organization should.
 */
export const getContacts = async (orderBy: string = 'last_name'): Promise<user[]> => {
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
                [orderBy]: "asc",
            },
        });


        return contacts;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

/**
 *  Fetches a single user record with the given user_id for single contact view. Depending on the user's role, it fetches additional information such as the client payment history or admin recent activities.
 *  @param user_id 
 *  @returns ExtendedUser
 */
export const getContactByID = async (user_id: number) => {
    try {
        const self = await getSelf();
        const contact = await db.user.findUnique({
            where: {
                id: user_id,
            }
        });

        if (!contact)
            throw new Error(`Couldn't find user with an id of ${user_id}.`);

        const submissions = await getSubmissionsByAuthorID(contact.id);

        return { ...contact, submissions };
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

/**
 *  Fetches a single user record with the given username.
 *  @param username 
 *  @returns ExtendedUser
 */
export const getContactByUsername = async (username: string) => {
    try {
        const self = await getSelf();
        const contact = await db.user.findFirst({
            where: {
                username,
            },
            include: {
                bookmarks: true
            }
        })

        if (!contact) throw new Error(`Couldn't find a contact with the username ${username}.`)

        return contact
    } catch (error) {
        throw new Error("Internal Error.")
    }
}