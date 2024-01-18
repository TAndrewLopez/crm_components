'use server'

import { db } from "@/lib/prisma"
import { role, user } from "@prisma/client";

//QUERIES
export const getUserByRole = async (role: role): Promise<user[] | null> => {
    try {
        return await db.user.findMany({
            where: {
                role,
            }
        })
    } catch (error) {
        console.log("Something went wrong", error);
        return null
    }
}

export const getAllRolesWithCount = async () => {
    return await db.user.groupBy({
        by: ['role'],
        _count: true
    })
}

// MUTATIONS