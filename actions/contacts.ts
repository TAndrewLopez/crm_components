"use server";

import * as z from "zod";
import { user } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { ContactUser } from "@/lib/types";
import { getSelf } from "./auth";
import { getDepositsByClientID } from "./deposits";
import { getSubmissionsByUserID } from "./submissions";
import { userSortingSettingsSchema } from "@/schemas";
import { convertSettingsObject, convertSettingsString } from "@/lib/utils";

export const getContactsGroupedByRole = async () => {
    try {
        const self = await getSelf();
        const roles = await db.user.groupBy({
            by: ["role"],
            _count: {
                role: true,
            },
            where: {
                role: {
                    not: "dev",
                },
            },
        });

        if (!roles) throw new Error("Error fetching roles.");

        const { contactSortOption, contactSortDir } = convertSettingsString(
            self.profile_settings
        );
        const contactPromises = roles.map(async ({ role }) => {
            const contacts = await db.user.findMany({
                where: {
                    role,
                },
                orderBy: [
                    {
                        [contactSortOption]: contactSortDir,
                    },
                    {
                        last_name: "asc",
                    },
                ],
            });

            return {
                contacts: contacts,
                role: role,
            };
        });
        const groupedContacts = await Promise.all(contactPromises);
        return groupedContacts;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

//QUERIES
/**
 *  Fetches all contacts that are not the logged in user. Or a dev... =] Revalidate Path '/'
 */
export const getContacts = async (): Promise<user[]> => {
    try {
        const self = await getSelf();
        const { contactSortOption, contactSortDir } = convertSettingsString(
            self.profile_settings
        );

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
                [contactSortOption]: contactSortDir,
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
 *  @returns ContactUser
 */
export const getContactByID = async (user_id: number): Promise<ContactUser> => {
    try {
        const self = await getSelf();
        const contact = await db.user.findUnique({
            where: {
                id: user_id,
            },
        });

        if (!contact)
            throw new Error(`Couldn't find user with an id of ${user_id}.`);

        const submissionsPromise = getSubmissionsByUserID(contact.id);
        const depositsPromise = getDepositsByClientID(contact.id);
        const [submissions, deposits] = await Promise.all([
            submissionsPromise,
            depositsPromise,
        ]);
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
export const getContactByUsername = async (
    username: string
): Promise<ContactUser> => {
    try {
        const self = await getSelf();
        const contact = await db.user.findFirst({
            where: {
                username,
            },
            include: {
                bookmarks: true,
            },
        });

        if (!contact)
            throw new Error(`Couldn't find a contact with the username ${username}.`);

        const submissionsPromise = getSubmissionsByUserID(contact.id);
        const depositsPromise = getDepositsByClientID(contact.id);
        const [submissions, deposits] = await Promise.all([
            submissionsPromise,
            depositsPromise,
        ]);
        return { ...contact, submissions, deposits };
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

// MUTATIONS
export const setContactSettings = async (
    values: z.infer<typeof userSortingSettingsSchema>
): Promise<void> => {
    try {
        const validatedFields = userSortingSettingsSchema.safeParse(values);
        if (!validatedFields.success) throw new Error("Invalid fields");
        const {
            bookmarkSortDir,
            bookmarkSortOption,
            contactSortDir,
            contactSortOption,
            showBirthday,
        } = validatedFields.data;

        const settingsString = convertSettingsObject({
            bookmarkSortOption,
            bookmarkSortDir,
            contactSortOption,
            contactSortDir,
            showBirthday,
        });

        const self = await getSelf();

        await db.user.update({
            where: {
                id: self.id,
            },
            data: {
                profile_settings: settingsString,
            },
        });

        revalidatePath("/settings");
        revalidatePath("/");
    } catch (error) {
        throw new Error("Internal Error.");
    }
};
