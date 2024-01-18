import { db } from "@/lib/prisma";

export const getFavoriteSubmissionsByUserID = async (id: number) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id,
            },
            include: {
                favorites: true
            }
        })

        if (!user) throw new Error("Invalid ID.")

        return user?.favorites
    } catch (error) {
        console.log("Something went wrong", error)
        return null
    }
}