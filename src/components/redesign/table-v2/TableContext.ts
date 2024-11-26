import { ColumnDef } from '@tanstack/react-table'
import { createContext, useContext } from 'react'

interface TableConfiguration {
    columns: ColumnDef<any>[]
    hasActionColumn: boolean
}

type TableContextType = TableConfiguration | null

export const TableContext = createContext<TableContextType>(null)

const useTableContext = () => {
    const context = useContext(TableContext)
    if (!context) {
        throw new Error("useTableContext must be used within a TableProvider")
    }
    return context
}

export default useTableContext