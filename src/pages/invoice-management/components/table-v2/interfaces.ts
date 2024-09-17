import { ColumnDef, SortingState } from "@tanstack/react-table"
import { ReactNode } from "react"

export interface InfiniteScrollProps {
    dataLength: number
    hasMore: boolean
    next: () => void
}

export interface TableRootProps<T extends object> {
    columns: ColumnDef<T>[]
    hasActionColumn?: boolean
    infiniteScroll?: InfiniteScrollProps
    children: ReactNode
}

export interface TableHeadProps<T extends object> {
    data: T[]
    enableSorting?: boolean
    sorting?: SortingState
    setSorting?: (state: SortingState) => void
}

export interface TableBodyProps {
    isLoading?: boolean
    children: ReactNode
}