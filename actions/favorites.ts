import { db } from "@/lib/prisma";
import { favorite } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getSubmissionByID } from "./submissions";

export const getFavoriteSubmissionsByUserID = async (
    id: number
): Promise<favorite[]> => {
    try {
        const favorites = await db.favorite.findMany({
            where: {
                user_id: id,
            },
            orderBy: {
                created_at: "desc",
            },
        });

        if (!favorites) throw new Error(`Couldn't find favorites with user_id: ${id}.`);

        revalidatePath("/");
        return favorites;
    } catch (error) {
        throw new Error("Internal Error.")
    }
};

export const updateFavoriteStatusByID = async (submission_id: number) => {
    try {
        const submission = await getSubmissionByID(submission_id)

        const favorite = await db.favorite.findFirst({
            where: {
                submission_id,
            },
        });

        if (!favorite) throw new Error(`Couldn't find favorite with id: ${submission_id}.`);

        if (submission.status !== favorite.status) {
            await db.favorite.update({
                where: {
                    id: favorite.id,
                },
                data: {
                    status: submission.status,
                },
            });
        }
        revalidatePath("/");
    } catch (error) {
        throw new Error("Internal Error.")
    }
};
