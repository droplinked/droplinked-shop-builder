import { Table as ChakraTable, Flex, Skeleton, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import useTableContext, { TableContext } from './TableContext'
import { TableBodyProps, TableHeadProps, TableRootProps } from './interfaces'

function TableRoot<T extends object>({ children, columns, hasActionColumn = false }: TableRootProps<T>) {
    return (
        <TableContext.Provider value={{ columns, hasActionColumn }}>
            <TableContainer
                border="1px solid #262626"
                borderRadius={8}
                overflow="hidden"
            >
                <ChakraTable
                    variant="unstyled"
                    sx={{
                        "th, td": { paddingInline: 6, paddingBlock: 4 },
                        userSelect: "none",
                    }}
                >
                    {children}
                </ChakraTable>
            </TableContainer>
        </TableContext.Provider>
    )
}

function TableHead<T extends object>(props: TableHeadProps<T>) {
    const { data, enableSorting = false, sorting, setSorting } = props
    const { columns, hasActionColumn } = useTableContext()
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
                    {hasActionColumn && <Th />}
                </Tr>
            ))}
        </Thead>
    )
}

function TableBody({ children, isLoading, infiniteScroll }: TableBodyProps) {
    const { columns, hasActionColumn } = useTableContext()
    const tableLoading = (
        Array.from({ length: 3 }).map((_, index) => (
            <Tr key={index}>
                {columns.map((_, colIndex) =>
                    <Td key={colIndex}>
                        <Skeleton height={5} borderRadius={4} startColor="#333" endColor="#555" />
                    </Td>
                )}
                {hasActionColumn && <Td><Skeleton height={5} borderRadius={4} startColor="#333" endColor="#555" /></Td>}
            </Tr>
        ))
    )

    const renderTableBody = () => {
        const { isFetchingNextPage } = infiniteScroll || {}
        if (isLoading && !isFetchingNextPage) return tableLoading
        if (infiniteScroll) {
            return (
                <>
                    {children}
                    {isFetchingNextPage && tableLoading}
                </>
            )
        }

        return children
    }

    return (
        <Tbody
            sx={{
                "tr": {
                    bgColor: "#1C1C1C",
                    borderBottom: "1px solid #262626",
                    color: "white",
                    transition: "background 0.2s",
                    _hover: { bgColor: "#222222" },
                    _last: { borderBottom: "none" }
                },
                "td": { fontSize: 16, fontWeight: 400 }
            }}
        >
            {renderTableBody()}
        </Tbody>
    )
}

function TableFooter({ children }) {
    const { columns } = useTableContext()

    return (
        <Tfoot borderTop={"1px solid #262626"}>
            <Tr bgColor="#1C1C1C">
                <Td colSpan={columns.length + 1} sx={{ textAlign: "-webkit-center" }}>
                    {children}
                </Td>
            </Tr>
        </Tfoot>
    )
}

const Table = {
    Root: TableRoot,
    Head: TableHead,
    Body: TableBody,
    Footer: TableFooter
}

export default Table