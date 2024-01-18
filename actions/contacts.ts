'use server'

import { role, user } from "@prisma/client";

import { db } from "@/lib/prisma";

//QUERIES
export const getUsersByRole = async (role: role): Promise<user[]> => {
    try {
        const users = await db.user.findMany({
            where: {
                role,
            }
        })

        if (!users) throw new Error(`Couldn't get users with role: ${role}.`)

        return users
    } catch (error) {
        throw new Error("Internal Error.")
    }
}

export const getAllRolesWithCount = async () => {
    return await db.user.groupBy({
        by: ['role'],
        _count: true
    })
}