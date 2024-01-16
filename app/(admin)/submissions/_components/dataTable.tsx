"use client";

import {
    ColumnDef,
    Table,
    flexRender
} from "@tanstack/react-table";

import {
    TableBody,
    TableCell,
    Table as TableComponent,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type Props<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    table: Table<TData>
};

export const DataTable = <TData, TValue>({
    columns,
    table
}: Props<TData, TValue>) => {
    return (
        <TableComponent className="bg-neutral-900">
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </TableComponent>
    );
};
