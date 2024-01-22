"use server";

import { user } from "@prisma/client";

import { db } from "@/lib/prisma";
import { ContactUser } from "@/lib/types";
import { getSelf } from "./auth";
import { getDepositsByClientID } from "./deposit";
import { getSubmissionsByAuthorID } from "./submissions";

//QUERIES

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

        // return [...contacts, ...contacts, ...contacts, ...contacts, ...contacts,];
        return contacts;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

/**
 *  Fetches a single user record with the given user_id for single contact view. Depending on the user's role, it fetches additional information such as the client payment history or admin recent activities.
 *  @param user_id 
 *  @returns ContactUser
 */
export const getContactByID = async (user_id: number): Promise<ContactUser> => {
    try {
        const self = await getSelf();
        const contact = await db.user.findUnique({
            where: {
                id: user_id,
            }
        });

        if (!contact)
            throw new Error(`Couldn't find user with an id of ${user_id}.`);

        const submissionsPromise = getSubmissionsByAuthorID(contact.id);
        const depositsPromise = getDepositsByClientID(contact.id)
        const [submissions, deposits] = await Promise.all([submissionsPromise, depositsPromise])
        return { ...contact, submissions, deposits };
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

/**
 *  Fetches a single user record with the given username.
 *  @param username 
 *  @returns ContactUser
 */
export const getContactByUsername = async (username: string): Promise<ContactUser> => {
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

        const submissionsPromise = getSubmissionsByAuthorID(contact.id);
        const depositsPromise = getDepositsByClientID(contact.id)
        const [submissions, deposits] = await Promise.all([submissionsPromise, depositsPromise])
        return { ...contact, submissions, deposits };
    } catch (error) {
        throw new Error("Internal Error.")
    }
}