"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "./dataTable";
import { DataTableHeader } from "./dataTableHeader";
import { DataTablePagination } from "./dataTablePagination";
import { useSidebar } from "@/store/useSidebar";
import { cn } from "@/lib/utils";

type Props<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
};

export const TableWrapper = <TData, TValue>({
    columns,
    data,
}: Props<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const { isOpen } = useSidebar();

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="relative flex flex-col px-5 overflow-y-auto w-full">
            <div
                className={cn(
                    "bg-neutral-800 fixed right-0 px-5 z-20",
                    isOpen ? "left-[320px]" : "left-[75px]"
                )}>
                <DataTableHeader table={table} />
            </div>
            <div className="bg-neutral-900 mt-20">
                <DataTable table={table} columns={columns} />
                <DataTablePagination table={table} />
            </div>
        </div>
    );
};
