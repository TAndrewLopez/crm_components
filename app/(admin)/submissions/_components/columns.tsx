"use client";

import { submission } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { markSubAsRead, markSubAsUnread } from "@/actions/submission";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<submission>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const { status } = row.original;
            return (
                <div className="pl-8">
                    {status === "unread" && (
                        <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full"></div>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "phone_number",
        header: "Phone Number",
        cell: ({ row }) => {
            const phoneNumber: string = row.getValue("phone_number");
            const areaCode = phoneNumber.slice(0, 3);
            const centralCode = phoneNumber.slice(3, 6);
            const lineNumber = phoneNumber.slice(6);
            return `(${areaCode}) ${centralCode}-${lineNumber}`;
        },
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id, status } = row.original
            const handleClick = status === 'read' ? markSubAsUnread : markSubAsRead
            const label = status === 'read' ? 'unread' : 'read'
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                            console.log(status)
                            handleClick(id)
                        }}>
                            Mark as {label}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`/submissions/${id}`}>View Submission</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => navigator.clipboard.writeText(String(id))}>
                            Copy Submission ID
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu >
            );
        },
    },
];
