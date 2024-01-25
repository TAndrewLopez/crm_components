'use server'

import { deposit } from "@prisma/client";

import { db } from "@/lib/prisma"
import { getSelf } from "./auth"

export const getDepositsByClientID = async (user_id: number): Promise<deposit[]> => {
    try {
        const self = await getSelf();
        const deposits = await db.deposit.findMany({
            where: {
                client_id: user_id,
            },
            orderBy: {
                created_at: 'desc'
            }
        })
        return deposits;
    } catch (error) {
        throw new Error("Internal Error.")
    }
}