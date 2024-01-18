"use client";

import { submission } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
    ArrowUpDown,
    GalleryVerticalEndIcon,
    MoreHorizontal,
    Copy,
    PlusCircle,
} from "lucide-react";
import Link from "next/link";

import {
    markGivenSubsAsRead,
    markGivenSubsAsUnread,
    markSubAsRead,
    markSubAsUnread,
} from "@/actions/submissions";
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
import { Hint } from "@/components/hint";
import { TableItem } from "./tableItem";
import { formatToUSNumber } from "@/lib/utils";

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
        cell: ({ row }) => (
            <TableItem
                href={`/submissions/${row.original.id}`}
                status={row.original.status}>
                {row.original.name}
            </TableItem>
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const { status } = row.original;
            return (
                <div className="pl-8">
                    {status === "new" && (
                        <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full"></div>
                    )}
                    {status === "read" && (
                        <div className="w-3.5 h-3.5 border-transparent border-2 border-emerald-500 rounded-full"></div>
                    )}
                    {status === "pending" && (
                        <div className="w-3.5 h-3.5 bg-amber-300 rounded-full"></div>
                    )}
                    {status === "closed" && (
                        <div className="w-3.5 h-3.5 bg-neutral-500 rounded-full"></div>
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
        cell: ({ row }) => (
            <TableItem status={row.original.status}>{row.original.email}</TableItem>
        ),
    },
    {
        accessorKey: "phone_number",
        header: "Phone Number",
        cell: ({ row }) => (
            <TableItem status={row.original.status}>
                {formatToUSNumber(row.getValue("phone_number"))}
            </TableItem>
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            return (
                <TableItem status={row.original.status}>
                    {row.original.description}
                </TableItem>
            );
        },
    },
    {
        id: "actions",
        header: ({ table }) => {
            const allSelected = table.getSelectedRowModel();
            const ids = allSelected.rows.map((row) => row.original.id);

            const handleMarkAllRead = async (ids: number[]) => {
                await markGivenSubsAsRead(ids);
                table.resetRowSelection();
            };

            const handleMarkAllUnread = async (ids: number[]) => {
                await markGivenSubsAsUnread(ids);
                table.resetRowSelection();
            };

            return (
                <div className="flex justify-end items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="mr-2">
                            <Hint delayAmount={0} side="left" label="All actions" asChild>
                                <GalleryVerticalEndIcon className="w-4 h-4 hover:text-white" />
                            </Hint>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>All Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <button className="w-full flex items-center justify-start gap-x-2 hover:underline">
                                    <PlusCircle className="w-4 h-4" />
                                    Create new submission
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleMarkAllUnread(ids)}>
                                Mark as unread
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleMarkAllRead(ids)}>
                                Mark as read
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Delete selection</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
        cell: ({ table, row }) => {
            const { id, name, email, phone_number, status } = row.original;
            const handleClick = () => {
                const click = status === "read" ? markSubAsUnread : markSubAsRead;
                click(id);
                table.resetRowSelection();
            };
            const label = status === "read" ? "unread" : "read";
            return (
                <div className="flex justify-end items-center">
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
                            <DropdownMenuItem>
                                <Link href={`/submissions/${id}`}>View Submission</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <button
                                    className="w-full flex items-center justify-start gap-x-2 hover:underline"
                                    onClick={handleClick}>
                                    Mark as {label}
                                </button>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <button
                                    className="w-full flex items-center justify-start gap-x-2 hover:underline"
                                    onClick={() => navigator.clipboard.writeText(name)}>
                                    <Copy className="w-3 h-3" />
                                    Copy Name
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <button
                                    className="w-full flex items-center justify-start gap-x-2 hover:underline"
                                    onClick={() => navigator.clipboard.writeText(email)}>
                                    <Copy className="w-3 h-3" />
                                    Copy Email
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <button
                                    className="w-full flex items-center justify-start gap-x-2 hover:underline"
                                    onClick={() =>
                                        navigator.clipboard.writeText(String(phone_number))
                                    }>
                                    <Copy className="w-3 h-3" />
                                    Phone Number
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
