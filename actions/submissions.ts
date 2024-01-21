"use server";

import { submission, submissionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { getSelf } from "./auth";
import { updateBookmarkStatusBySubmissionID } from "./bookmark";

// BOOLEANS

/**
 * Check if the status for the given submission_id is new.
 * @param submission_id 
 * @returns boolean
 */
export const isSubmissionNew = async (
    submission_id: number
): Promise<boolean> => {
    const self = await getSelf()
    const submission = await getSubmissionByID(submission_id);
    return submission.status === "new" ? true : false;
};

// QUERIES

/**
 * Fetch all of the submission records.
 * @returns Submission[]
 */
export const getSubmissions = async (): Promise<submission[]> => {
    try {
        const self = await getSelf();
        return await db.submission.findMany({
            orderBy: {
                created_at: 'desc'
            }
        });
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

/**
 * Fetch a single submission record with the given submission_id for the logged in user.
 * @param submission_id 
 * @returns 
 */
export const getSubmissionByID = async (
    submission_id: number
): Promise<submission> => {
    try {
        const self = await getSelf();
        const submission = await db.submission.findUnique({
            where: {
                id: submission_id,
            },
            include: {
                author: true,
            },
        });

        if (!submission)
            throw new Error(
                `Couldn't find a submission with submission_id: ${submission_id}.`
            );

        return submission;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

/**
 * Fetch all submission records for given author_id. 
 * @param author_id 
 * @returns submission[]
 */
export const getSubmissionsByAuthorID = async (author_id: number) => {
    try {
        const self = await getSelf()
        return await db.submission.findMany({
            where: {
                author_id,
            },
            orderBy: {
                created_at: 'desc'
            }
        })
    } catch (error) {
        throw new Error("Internal Error.")
    }
}

// MUTATIONS

/**
 * Update the status of a submission record with the given submission_id to the given status. Revalidate Path: '/'Revalidate Path: '/'
 * @param submission_id 
 * @param status 
 * @returns submission
 */
export const setSubmissionStatus = async (
    submission_id: number,
    status: submissionStatus
): Promise<submission> => {
    try {
        const selfPromise = getSelf();
        const submissionPromise = getSubmissionByID(submission_id);
        const [self, submission] = await Promise.all([selfPromise, submissionPromise])

        if (submission.status === status) {
            throw new Error(`Submission is already marked as ${status}.`);
        }

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
            await updateBookmarkStatusBySubmissionID(bookmark.id);
        }

        revalidatePath("/");
        return updatedSubmission;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

// TODO: COMPLETE LOGIC FOR SETTING ARRAY OF IDS TO A SPECIFIC STATUS
export const markSubArrayAsRead = async (
    submission_ids: number[]
): Promise<void> => {
    try {
        const self = await getSelf()
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
        const self = await getSelf()
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
