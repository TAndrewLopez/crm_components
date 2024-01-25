"use server";

import { submission, submissionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/prisma";
import { getSelf } from "./auth";
import { setBookmarkStatusBySubmissionID } from "./bookmarks";
import { SubContact, PartialSubmission, SubmissionWithUser } from "@/lib/types";
import { initialDataSchema } from "@/schemas";


// BOOLEANS
/**
 *  Check if the status for the given submission_id is new.
 *  @param submission_id
 *  @returns boolean
 */
export const isSubmissionNew = async (
    submission_id: number
): Promise<boolean> => {
    const selfPromise = getSelf();
    const submissionPromise = getPartialSubmissionByID(submission_id);
    const [self, submission] = await Promise.all([selfPromise, submissionPromise])
    return submission.status === "new" ? true : false;
};


// QUERIES
/**
 *  Fetch all of the submission records.
 *  @returns submission[]
 */
export const getSubmissions = async (): Promise<submission[]> => {
    try {
        const self = await getSelf();
        return await db.submission.findMany({
            orderBy: {
                created_at: "desc",
            },
        });
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

/**
 *  Fetch all submission records for given user_id.
 *  @param user_id
 *  @returns submission[]
 */
export const getSubmissionsByUserID = async (
    user_id: number
): Promise<submission[]> => {
    try {
        const self = await getSelf();
        const submissions = await db.submission.findMany({
            where: {
                user_id,
            },
            orderBy: {
                created_at: "desc",
            },
        });

        if (!submissions) return []

        return submissions;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

/**
 *  Fetch a trimmed version of a single submission record with the given submission_id.
 *  @param submission_id
 *  @returns PartialSubmission
 */
export const getPartialSubmissionByID = async (
    submission_id: number
): Promise<PartialSubmission> => {
    try {
        const self = await getSelf();
        const submission = await db.submission.findUnique({
            where: {
                id: submission_id,
            },
            select: {
                id: true,
                name: true,
                status: true,
                email: true,
            },
        });

        if (!submission) {
            throw new Error(
                `Couldn't find a submission with submission_id: ${submission_id}.`
            );
        }

        return submission;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

/**
 *  Fetch a single submission record with the given submission_id, includes it's user.
 *  @param submission_id
 *  @returns submission
 */
export const getSubmissionByID = async (
    submission_id: number
): Promise<SubmissionWithUser> => {
    try {
        const self = await getSelf();
        const submission = await db.submission.findUnique({
            where: {
                id: submission_id,
            },
            include: {
                user: true,
            },
        });

        if (!submission) {
            throw new Error(
                `Couldn't find a submission with submission_id: ${submission_id}.`
            );
        }

        return submission;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};


// MUTATIONS
/**
 *  Update the status of a submission record with the given submission_id to the given status. Revalidate Path: '/'Revalidate Path: '/'
 *  @param submission_id
 *  @param status
 *  @returns submission
 */
export const setSubmissionStatus = async (
    submission_id: number,
    status: submissionStatus
): Promise<submission> => {
    try {
        const selfPromise = getSelf();
        const submissionPromise = getPartialSubmissionByID(submission_id);
        const [self, submission] = await Promise.all([
            selfPromise,
            submissionPromise,
        ]);

        // if (submission.status === status) {
        //     throw new Error(`Submission is already marked as ${status}.`);
        // }

        const updatedSubmission = await db.submission.update({
            where: {
                id: submission.id,
            },
            data: {
                status,
            },
        });

        const bookmark = await db.bookmark.findFirst({
            where: {
                owner_id: self.id,
                submission_id: updatedSubmission.id,
            },
        });

        if (bookmark) {
            await setBookmarkStatusBySubmissionID(
                bookmark.id,
                updatedSubmission.status
            );
        }

        revalidatePath("/");
        return updatedSubmission;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

export const setSubmissionData = async (
    submission_id: number,
    values: z.infer<typeof initialDataSchema>
) => {
    try {
        const validatedFields = initialDataSchema.safeParse(values);
        if (!validatedFields.success) throw new Error("Invalid Fields");

        const selfPromise = getSelf();
        const submissionPromise = getPartialSubmissionByID(submission_id);
        const [self, submission] = await Promise.all([
            selfPromise,
            submissionPromise,
        ]);
    } catch (error) {
        throw new Error("Internal Error.");
    }
};


// TODO
// COMPLETE LOGIC FOR SETTING ARRAY OF IDS TO A SPECIFIC STATUS
export const markSubArrayAsRead = async (
    submission_ids: number[]
): Promise<void> => {
    try {
        const self = await getSelf();
        for (const id of submission_ids) {
            await db.submission.update({
                where: {
                    id,
                },
                data: {
                    status: "read",
                },
            });
        }
        revalidatePath("/");
    } catch (error) {
        throw new Error("Internal Error.");
    }
    // for (const id of submission_ids) {
    //     try {
    //         await db.submission.update({
    //             where: {
    //                 id,
    //             },
    //             data: {
    //                 status: "read",
    //             },
    //         });
    //         revalidatePath("/");
    //     } catch (error) {
    //         throw new Error("Internal Error.");
    //     }
    // }
};

export const markSubArrayAsUnread = async (
    submission_ids: number[]
): Promise<void> => {
    try {
        const self = await getSelf();
        for (const id of submission_ids) {
            await db.submission.update({
                where: {
                    id,
                },
                data: {
                    status: "new",
                },
            });
        }
        revalidatePath("/");
    } catch (error) {
        throw new Error("Internal Error.");
    }
    // for (const id of submission_ids) {
    //     try {
    //         await db.submission.update({
    //             where: {
    //                 id,
    //             },
    //             data: {
    //                 status: "new",
    //             },
    //         });
    //         revalidatePath("/");
    //     } catch (error) {
    //         throw new Error("Internal Error.");
    //     }
    // }
};
