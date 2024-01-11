"use client";

import { InitialSubmission } from "@/temporary/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<InitialSubmission>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        cell: ({ row }) => {
            const phoneNumber: string = row.getValue('phoneNumber')
            const areaCode = phoneNumber.slice(0, 3)
            const centralCode = phoneNumber.slice(3, 6)
            const lineNumber = phoneNumber.slice(6)
            return `(${areaCode}) ${centralCode}-${lineNumber}`
        }
    },
    {
        accessorKey: "description",
        header: "Description",
    },
];
