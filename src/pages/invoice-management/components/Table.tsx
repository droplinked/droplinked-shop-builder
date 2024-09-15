import { Table as ChakraTable, Flex, Skeleton, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import AppIcons from "assest/icon/Appicons"
import React, { ReactNode } from 'react'

interface Props<T extends object> {
    columns: ColumnDef<T>[]
    data: T[]
    renderActions?: (row: T) => ReactNode
    enableSorting?: boolean
    sorting?: SortingState
    setSorting?: (state: SortingState) => void
    isLoading?: boolean
    footerContent?: ReactNode
}

function Table<T extends object>(props: Props<T>) {
    const { columns, data, renderActions, enableSorting = false, sorting, setSorting, isLoading, footerContent } = props
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
            overflowX="auto"
        >
            <ChakraTable
                variant="unstyled"
                sx={{
                    "th, td": { paddingInline: 6, paddingBlock: 4, fontSize: 14, fontWeight: 400 },
                    userSelect: "none"
                }}
            >
                <Thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <Tr key={headerGroup.id} bgColor="#262626">
                            {headerGroup.headers.map(header => (
                                <Th
                                    key={header.id}
                                    textTransform="capitalize"
                                    color="#7B7B7B"
                                    cursor={enableSorting ? "pointer" : "default"}
                                    sx={{ "svg": { display: "inline-block" } }}
                                    onClick={enableSorting ? header.column.getToggleSortingHandler() : undefined}
                                >
                                    {
                                        enableSorting ?
                                            <Flex alignItems={"center"} gap={1}>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getIsSorted() ? (header.column.getIsSorted() === 'desc' ? <AppIcons.DescSorting /> : <AppIcons.AscSorting />) : null}
                                            </Flex>
                                            :
                                            flexRender(header.column.columnDef.header, header.getContext())
                                    }
                                </Th>
                            ))}
                            {renderActions && <Th></Th>}
                        </Tr>
                    ))}
                </Thead>

                <Tbody
                    sx={{
                        "tr": {
                            bgColor: "#1C1C1C",
                            transition: "background 0.2s",
                            _hover: { bgColor: "#222222" }
                        }
                    }}
                >
                    {
                        isLoading ?
                            Array.from({ length: 3 }).map((_, index) => (
                                <Tr key={index}>
                                    {columns.map((_, colIndex) => (
                                        <Td key={colIndex}>
                                            <Skeleton height={5} borderRadius={4} startColor="#333" endColor="#555" />
                                        </Td>
                                    ))}
                                    {renderActions && <Td><Skeleton height={5} borderRadius={4} startColor="#333" endColor="#555" /></Td>}
                                </Tr>
                            ))
                            :
                            table.getRowModel().rows.map((row, rowIndex) => {
                                return (
                                    <Tr
                                        key={row.id}
                                        borderTop="1px solid #262626"
                                        borderBottom={rowIndex === table.getRowModel().rows.length - 1 ? "none" : "1px solid #262626"}
                                        color="white"
                                    >
                                        {row.getVisibleCells().map((cell, cellIndex) => (
                                            <Td key={cell.id} fontSize={16} fontWeight={400}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </Td>
                                        ))}
                                        {renderActions && <Td>{renderActions(row.original)}</Td>}
                                    </Tr>
                                )
                            })
                    }
                </Tbody>

                {footerContent && (
                    <Tfoot>
                        <Tr bgColor="#1C1C1C">
                            <Td colSpan={columns.length + 1} sx={{ textAlign: "-webkit-center" }}>
                                {footerContent}
                            </Td>
                        </Tr>
                    </Tfoot>
                )}
            </ChakraTable>
        </TableContainer>
    )
}

export default Table