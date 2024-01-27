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
                        equals: undefined,
                    },
                },
            },
        });
        if (!user.user_id) {
            throw new Error("Couldn't fetch client id with most submissions.")
        }

        const client = await db.user.findUnique({
            where: {
                id: user.user_id
            },
            select: {
                first_name: true,
                last_name: true,
                username: true,
                role: true,
                image_url: true,
            },
        })

        return { ...client, totalSubmissions: user._count.email };
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
                status: "paid",
                client_id: {
                    not: null,
                },
            },
            orderBy: {
                _sum: {
                    amount: "desc",
                },
            },
        });

        if (!user.client_id) {
            throw new Error(
                "Error finding client with the highest paid deposit amount"
            );
        }

        const client = await db.user.findUnique({
            where: {
                id: user.client_id,
            },
            select: {
                first_name: true,
                last_name: true,
                username: true,
                role: true,
                image_url: true,
            },
        });

        return { ...client, amountPaid: user._sum.amount };
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

export const getEmployeeIDWithHighestPaidDepositAmount = async () => {
    try {
        const [user] = await db.deposit.groupBy({
            by: ["paid_to_id"],
            _sum: {
                amount: true,
            },
            where: {
                status: "paid",
            },
            orderBy: {
                _sum: {
                    amount: "desc",
                },
            },
        });
        const employee = await db.user.findUnique({
            where: {
                id: user.paid_to_id,
            },
            select: {
                first_name: true,
                last_name: true,
                username: true,
                role: true,
                image_url: true,
            },
        });
        return { ...employee, amountPaid: user._sum.amount };
    } catch (error) {
        throw new Error("Internal Error.");
    }
};

export const getDashboardData = async () => {
    try {
        const mostSubmissionPromise = getClientIDWithMostSubmissions();
        const mostClientPaidDepositPromise =
            getClientIDWithHighestPaidDepositAmount();
        const mostEmployeePaidDepositPromise =
            getEmployeeIDWithHighestPaidDepositAmount();
        const [
            clientWithMostSubmissions,
            clientWithMostPaidDeposit,
            employeeWithMostPaidDeposit,
        ] = await Promise.all([
            mostSubmissionPromise,
            mostClientPaidDepositPromise,
            mostEmployeePaidDepositPromise,
        ]);
        return {
            clientWithMostSubmissions,
            clientWithMostPaidDeposit,
            employeeWithMostPaidDeposit,
        };
    } catch (error) {
        throw new Error("Internal Error.");
    }
};
