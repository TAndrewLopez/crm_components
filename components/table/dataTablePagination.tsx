import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

type Props<TData> = {
    table: Table<TData>;
};

export const DataTablePagination = <TData, TValue>({ table }: Props<TData>) => {
    return (
        <div className="flex items-center justify-between space-x-2 p-4">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center justify-between space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}>
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}>
                    Next
                </Button>
            </div>
        </div>
    );
};
