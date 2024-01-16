import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

type Props<TData> = {
    table: Table<TData>
}

export const DataTableHeader = <TData, TValue>({ table }: Props<TData>) => {
    return (
        <div className="flex items-center py-4">
            <Input
                placeholder="Filter emails..."
                className="max-w-sm"
                value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("email")?.setFilterValue(event.target.value)
                }
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        Toggle Columns
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }>
                                    {column.id.split("_").join(" ")}
                                </DropdownMenuCheckboxItem>
                            );
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}