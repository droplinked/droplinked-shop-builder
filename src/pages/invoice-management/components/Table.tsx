import { Table as ChakraTable, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import React, { ReactNode, useState } from 'react'

interface TableProps<T extends object> {
    columns: ColumnDef<T>[]
    data: T[]
    renderActions?: (row: T) => ReactNode
    emptyView?: ReactNode
}

const Table = <T extends object>({ columns, data, renderActions, emptyView }: TableProps<T>) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <TableContainer
            border="1px solid #262626"
            borderRadius={8}
            overflow="hidden"
        >
            <ChakraTable
                variant="unstyled"
                sx={{ userSelect: "none" }}
            >
                <Thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <Tr key={headerGroup.id} bgColor="#262626">
                            {headerGroup.headers.map(header => (
                                <Th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    textTransform="capitalize"
                                    fontSize={16}
                                    fontWeight={400}
                                    color="#7B7B7B"
                                    paddingInline={6}
                                    paddingBlock={4}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() ? (header.column.getIsSorted() === 'desc' ? ' 🔽' : ' 🔼') : null}
                                </Th>
                            ))}
                            {renderActions && (
                                <Th paddingInline={6} paddingBlock={4}></Th>
                            )}
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
                        table.getRowModel().rows.map((row, rowIndex) => (
                            <Tr
                                key={row.id}
                                borderTop="1px solid #262626"
                                borderBottom={rowIndex === table.getRowModel().rows.length - 1 ? "none" : "1px solid #262626"}
                                bgColor="#1C1C1C"
                                color="white"
                            >
                                {row.getVisibleCells().map(cell => (
                                    <Td
                                        key={cell.id}
                                        paddingInline={6}
                                        paddingBlock={4}
                                        fontSize={16}
                                        fontWeight={400}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </Td>
                                ))}
                                {renderActions && (
                                    <Td paddingInline={6} paddingBlock={4}>
                                        {renderActions(row.original)}
                                    </Td>
                                )}
                            </Tr>
                        ))}
                </Tbody>
            </ChakraTable>
        </TableContainer>
    )
}

export default Table