'use server'

import { db } from "@/lib/prisma";
import { role } from "@prisma/client";

export const getUnreadSubCount = async (): Promise<number> => {
    try {
        return await db.submission.count({
            where: {
                status: "new",
            },
        });
    } catch (error) {
        throw new Error("Internal Error.")
    }
};

export const getAdminContactCount = async (): Promise<number> => {
    try {
        return await db.user.count({
            where: {
                NOT: [
                    { role: 'dev' }
                ]
            }
        })
    } catch (error) {
        throw new Error("Internal Error.")
    }
}

// export const getContactCount = (role: role) => {
//     switch (role) {
//         case 'admin':
//             return getAdminContactCount
//         case "client":
//             break;
//         case "dev":
//             break;
//         case 'owner':
//             break
//         default:
//             break;
//     }
// }