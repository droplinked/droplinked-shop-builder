import { Table as ChakraTable, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import React, { ReactNode } from 'react'

interface Props<T extends object> {
    columns: ColumnDef<T>[]
    data: T[]
    renderActions?: (row: T) => ReactNode
    emptyView?: ReactNode
    enableSorting?: boolean
    sorting?: SortingState
    setSorting?: (state: SortingState) => void
    groupBy?: keyof T
    renderGroupCell?: (row: T, cell: any, isFirstInGroup: boolean) => ReactNode
}

const Table = <T extends object>({ columns, data, renderActions, emptyView, enableSorting = false, sorting, setSorting, groupBy, renderGroupCell }: Props<T>) => {
    const table = useReactTable({
        data,
        columns,
        state: { sorting: enableSorting ? sorting : undefined },
        onSortingChange: enableSorting ? setSorting : undefined,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: enableSorting ? getSortedRowModel() : undefined
    })

    return (
        <TableContainer
            border="1px solid #262626"
            borderRadius={8}
            overflow="hidden"
        >
            <ChakraTable
                variant="unstyled"
                sx={{ userSelect: enableSorting ? "none" : "auto" }}
            >
                <Thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <Tr key={headerGroup.id} bgColor="#262626">
                            {headerGroup.headers.map(header => (
                                <Th
                                    key={header.id}
                                    onClick={enableSorting ? header.column.getToggleSortingHandler() : undefined}
                                    textTransform="capitalize"
                                    fontSize={16}
                                    fontWeight={400}
                                    color="#7B7B7B"
                                    paddingInline={6}
                                    paddingBlock={4}
                                    cursor={enableSorting ? "pointer" : "default"}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {enableSorting && header.column.getIsSorted() ? (header.column.getIsSorted() === 'desc' ? ' 🔽' : ' 🔼') : null}
                                </Th>
                            ))}
                            {renderActions && (<Th paddingInline={6} paddingBlock={4}></Th>)}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {data.length === 0 ?
                        <Tr bgColor="#1C1C1C">
                            <Td
                                colSpan={columns.length + 1}
                                paddingInline={6}
                                paddingBlock={4}
                            >
                                {emptyView || 'No data available'}
                            </Td>
                        </Tr>
                        :
                        table.getRowModel().rows.map((row, rowIndex) => {
                            const currentRow = row.original
                            const prevRow = rowIndex > 0 ? table.getRowModel().rows[rowIndex - 1].original : null
                            const nextRow = rowIndex < table.getRowModel().rows.length - 1 ? table.getRowModel().rows[rowIndex + 1].original : null

                            const isFirstInGroup = !prevRow || (groupBy && currentRow[groupBy] !== prevRow[groupBy])
                            const isLastInGroup = !nextRow || (groupBy && currentRow[groupBy] !== nextRow[groupBy])

                            return (
                                <Tr
                                    key={row.id}
                                    borderTop={isFirstInGroup ? "1px solid #262626" : "none"}
                                    borderBottom={isLastInGroup ? "1px solid #262626" : "none"}
                                    bgColor="#1C1C1C"
                                    color="white"
                                >
                                    {row.getVisibleCells().map((cell, cellIndex) => (
                                        <Td
                                            key={cell.id}
                                            paddingInline={6}
                                            paddingBlock={4}
                                            fontSize={16}
                                            fontWeight={400}
                                        >
                                            {renderGroupCell
                                                ? renderGroupCell(currentRow, cell, isFirstInGroup)
                                                : flexRender(cell.column.columnDef.cell, cell.getContext())
                                            }
                                        </Td>
                                    ))}
                                    {renderActions && (
                                        <Td paddingInline={6} paddingBlock={4}>
                                            {renderActions(row.original)}
                                        </Td>
                                    )}
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </ChakraTable>
        </TableContainer>
    )
}

export default Table