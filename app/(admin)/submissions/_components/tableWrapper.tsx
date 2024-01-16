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
    useReactTable
} from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "./dataTable";
import { DataTableHeader } from "./dataTableHeader";
import { DataTablePagination } from "./dataTablePagination";

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
        <div>
            <div className="top-0 z-50 bg-neutral-800 sticky">
                <DataTableHeader table={table} />
            </div>
            <DataTable table={table} columns={columns} />
            <DataTablePagination table={table} />
        </div>
    );
};
