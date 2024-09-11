import { Table as ChakraTable, Flex, Skeleton, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import AppIcons from "assest/icon/Appicons"
import AppTypography from "components/common/typography/AppTypography"
import React, { ReactNode } from 'react'

interface Props<T extends object> {
    columns: ColumnDef<T>[]
    data: T[]
    renderActions?: (row: T) => ReactNode
    emptyView?: ReactNode
    enableSorting?: boolean
    sorting?: SortingState
    setSorting?: (state: SortingState) => void
    isLoading?: boolean
}

const Table = <T extends object>({ columns, data, renderActions, emptyView, enableSorting = false, sorting, setSorting, isLoading }: Props<T>) => {
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
                <Thead sx={{ "th": { paddingInline: 6, paddingBlock: 4 } }}>
                    {table.getHeaderGroups().map(headerGroup => (
                        <Tr key={headerGroup.id} bgColor="#262626">
                            {headerGroup.headers.map(header => (
                                <Th
                                    key={header.id}
                                    textTransform="capitalize"
                                    fontSize={16}
                                    fontWeight={400}
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
                            {!isLoading && renderActions && <Th></Th>}
                        </Tr>
                    ))}
                </Thead>
                <Tbody sx={{ "td": { paddingInline: 6, paddingBlock: 4 } }}>
                    {
                        isLoading ?
                            Array.from({ length: 1 }).map((_, index) => (
                                <Tr key={index} bgColor="#1C1C1C">
                                    {columns.map((_, colIndex) => (
                                        <Td key={colIndex}>
                                            <Skeleton height={5} borderRadius={4} startColor="#333" endColor="#555" />
                                        </Td>
                                    ))}
                                </Tr>
                            ))
                            :
                            data.length === 0 ?
                                <Tr bgColor="#1C1C1C">
                                    <Td colSpan={columns.length + 1} sx={{ textAlign: "-webkit-center" }}>
                                        {
                                            emptyView
                                            ||
                                            <AppTypography fontSize={14} color={"white"}>No data available</AppTypography>
                                        }
                                    </Td>
                                </Tr>
                                :
                                table.getRowModel().rows.map((row, rowIndex) => {
                                    return (
                                        <Tr
                                            key={row.id}
                                            borderTop="1px solid #262626"
                                            borderBottom={rowIndex === table.getRowModel().rows.length - 1 ? "none" : "1px solid #262626"}
                                            bgColor="#1C1C1C"
                                            color="white"
                                        >
                                            {row.getVisibleCells().map((cell, cellIndex) => (
                                                <Td
                                                    key={cell.id}
                                                    fontSize={16}
                                                    fontWeight={400}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </Td>
                                            ))}
                                            {!isLoading && renderActions && <Td>{renderActions(row.original)}</Td>}
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