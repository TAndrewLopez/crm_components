"use server";

import { db } from "@/lib/prisma";

/**
 * Fetches the id with the most amount of submissions in the database. 
 * @returns user_id
 */
export const getClientIDWithMostSubmissions = async () => {
    try {
        const [user] = await db.submission.groupBy({
            by: ["user_id"],
            _count: {
                email: true,
            },
            where: {
                user_id: {
                    not: {
                        equals: undefined
                    }
                }
            },
        });
        return user.user_id;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

/**
 * Fetches the id with the highest sum of paid deposits in the database.
 * @returns 
 */
export const getClientIDWithHighestPaidDepositAmount = async () => {
    try {
        const [user] = await db.deposit.groupBy({
            by: ["client_id"],
            _sum: {
                amount: true,
            },
            where: {
                status: 'paid',
                client_id: {
                    not: null,
                },
            },
            orderBy: {
                _sum: {
                    amount: 'desc'
                }
            },
        });

        return user.client_id;
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

export const getEmployeeIDWithHighestPaidDepositAmount = async () => {
    try {
        const [user] = await db.deposit.groupBy({
            by: ['paid_to_id'],
            _sum: {
                amount: true,
            },
            where: {
                status: "paid",
            },
            orderBy: {
                _sum: {
                    amount: 'desc'
                }
            }
        })

        return user.paid_to_id
    } catch (error) {
        throw new Error("Internal Error.")
    }
}

