'use server'

import { db } from "@/lib/prisma"
import { user } from "@prisma/client"

export const getUserByUsername = async (username: string): Promise<user | null> => {
    try {
        return await db.user.findFirst({
            where: {
                username,
            }
        })
    } catch (error) {
        console.log("Something went wrong", error)
        return null
    }
}