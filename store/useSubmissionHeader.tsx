import { ColumnFiltersState, VisibilityState, type SortingState } from "@tanstack/react-table";
import { create } from "zustand";


interface SubmissionHeaderProps {
    sorting: SortingState
    columFilters: ColumnFiltersState
    columnVisibility: VisibilityState
    setSorting: () => void
}

export const useSubmissionHeader = create<SubmissionHeaderProps>((set) => ({
    sorting: [],
    columFilters: [],
    columnVisibility: {},
    setSorting: () => set((state) => ({
        ...state,
    }))
}))