import { Table as ChakraTable, Flex, Skeleton, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import AppIcons from 'assest/icon/Appicons'
import React, { ReactNode } from 'react'

interface TableHeadProps<T extends object> {
    columns: ColumnDef<T>[]
    data: T[]
    hasActionColumn?: boolean
    enableSorting?: boolean
    sorting?: SortingState
    setSorting?: (state: SortingState) => void
    footerContent?: ReactNode
}

interface TableBodyProps<T extends object> {
    columns: ColumnDef<T>[]
    isLoading?: boolean
    hasActionColumn?: boolean
    children: ReactNode
}

function TableRoot({ children }) {
    return (
        <TableContainer
            border="1px solid #262626"
            borderRadius={8}
            overflow="hidden"
        >
            <ChakraTable
                variant="unstyled"
                sx={{
                    "th, td": { paddingInline: 6, paddingBlock: 4 },
                    userSelect: "none"
                }}
            >
                {children}
            </ChakraTable>
        </TableContainer>
    )
}

function TableHead<T extends object>(props: TableHeadProps<T>) {
    const { columns, data, hasActionColumn = false, enableSorting = false, sorting, setSorting, footerContent } = props

    const table = useReactTable({
        data,
        columns,
        state: { sorting: enableSorting ? sorting : undefined },
        onSortingChange: enableSorting ? setSorting : undefined,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: enableSorting ? getSortedRowModel() : undefined
    })

    return (
        <Thead>
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
                    {hasActionColumn && <Th></Th>}
                </Tr>
            ))}
        </Thead>
    )
}

function TableBody<T extends object>({ isLoading, columns, hasActionColumn, children }: TableBodyProps<T>) {
    return (
        <Tbody
            sx={{
                "tr": {
                    bgColor: "#1C1C1C",
                    borderTop: "1px solid #262626",
                    borderBottom: "1px solid #262626",
                    color: "white",
                    transition: "background 0.2s",
                    _hover: { bgColor: "#222222" },
                    _last: { borderBottom: "none" }
                },
                "td": { fontSize: 16, fontWeight: 400 }
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
                            {hasActionColumn && <Td><Skeleton height={5} borderRadius={4} startColor="#333" endColor="#555" /></Td>}
                        </Tr>
                    ))
                    :
                    children
            }
        </Tbody >
    )
}

function TableFooter({ children }) {
    return <Tfoot>{children}</Tfoot>
}

const Table = {
    Root: TableRoot,
    Head: TableHead,
    Body: TableBody,
    Footer: TableFooter
}

export default Table