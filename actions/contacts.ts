'use server'

import { db } from "@/lib/prisma"

//QUERIES
export const getAllClients = async () => {
    try {
        return await db.user.findMany({
            where: {
                role: 'client'
            }
        })
    } catch (error) {
        console.log("Something went wrong", error);
        return null
    }
}

export const getAllAdmins = async () => {
    try {
        return await db.user.findMany({
            where: {
                role: 'admin'
            }
        })
    } catch (error) {
        console.log("Something went wrong", error);
        return null
    }
}

export const getAllDevelopers = async () => {
    try {
        return await db.user.findMany({
            where: {
                role: "dev"
            }
        })
    } catch (error) {
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