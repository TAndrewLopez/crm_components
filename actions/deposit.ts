'use server'

import { db } from "@/lib/prisma"
import { getSelf } from "./auth"
import { deposit } from "@prisma/client";

export const getDepositsByClientID = async (user_id: number): Promise<deposit[]> => {
    try {
        const self = await getSelf();
        return await db.deposit.findMany({
            where: {
                client_id: user_id,
            },
            orderBy: {
                created_at: 'desc'
            }
        })
    } catch (error) {
        throw new Error("Internal Error.")
    }
}