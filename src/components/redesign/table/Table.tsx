import { Table as ChakraTable, Flex, Skeleton, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import AppIcons from "assets/icon/Appicons"
import React, { ReactNode } from 'react'
import InfiniteScroll from "react-infinite-scroll-component"

/**
 * Advanced table component with sorting and infinite scroll capabilities
 * 
 * @template T - The type of data in the table rows
 * @param {object} props - Component props
 * @param {ColumnDef<T>[]} props.columns - Column definitions (from TanStack Table)
 * @param {T[]} props.data - Array of data items to display in the table
 * @param {(row: T) => ReactNode} [props.renderActions] - Function to render action buttons for each row
 * @param {boolean} [props.enableSorting=false] - Whether to enable column sorting
 * @param {SortingState} [props.sorting] - Current sorting state (required if enableSorting=true)
 * @param {(state: SortingState) => void} [props.setSorting] - Function to update sorting state
 * @param {boolean} [props.isLoading] - Whether to show loading state
 * @param {ReactNode} [props.emptyView] - Content to show when there's no data
 * @param {ReactNode} [props.footerContent] - Content to display in the table footer
 * @param {object} [props.infiniteScroll] - Configuration for infinite scrolling
 * @param {number} props.infiniteScroll.dataLength - Current number of items in data array
 * @param {boolean} props.infiniteScroll.hasMore - Whether there's more data to load
 * @param {() => void} props.infiniteScroll.next - Function to fetch next page of data
 * @param {boolean} props.infiniteScroll.isFetchingNextPage - Whether next page is currently loading
 * @param {number|string} [props.tableFontSize] - Font size for table cells
 * 
 * @returns {JSX.Element} Advanced table component
 */
interface Props<T extends object> {
    columns: ColumnDef<T>[]
    data: T[]
    renderActions?: (row: T) => ReactNode
    enableSorting?: boolean
    sorting?: SortingState
    setSorting?: (state: SortingState) => void
    isLoading?: boolean
    emptyView?: ReactNode
    footerContent?: ReactNode
    paddingInline?: number | string
    paddingBlock?: number | string
    infiniteScroll?: {
        dataLength: number
        hasMore: boolean
        next: () => void
        isFetchingNextPage: boolean
    }
    tableFontSize?: number | string;
}

function Table<T extends object>(props: Props<T>) {
    const { tableFontSize, columns, data, renderActions, enableSorting = false, sorting, setSorting, isLoading, emptyView, footerContent, infiniteScroll, paddingInline, paddingBlock } = props
    const table = useReactTable({
        data,
        columns,
        state: { sorting: enableSorting ? sorting : undefined },
        onSortingChange: enableSorting ? setSorting : undefined,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: enableSorting ? getSortedRowModel() : undefined
    })

    const tableLoading = (
        Array.from({ length: 3 }).map((_, index) => (
            <Tr key={index}>
                {columns.map((_, colIndex) => (
                    <Td key={colIndex}>
                        <Skeleton height={5} borderRadius={4} startColor="#333" endColor="#555" />
                    </Td>
                ))}
                {renderActions && (
                    <Td>
                        <Skeleton height={5} borderRadius={4} startColor="#333" endColor="#555" />
                    </Td>
                )}
            </Tr>
        ))
    )

    const tableRows = (
        table.getRowModel().rows.map((row, rowIndex) => (
            <Tr
                key={row.id}
                borderTop="1px solid"
                borderColor="neutral.gray.850"
                borderBottom={rowIndex === table.getRowModel().rows.length - 1 ? "none" : "1px solid neutral.gray.850"}
                color="white"
            >
                {row.getVisibleCells().map((cell, cellIndex) => (
                    <Td key={cellIndex} fontSize={16} fontWeight={400}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                ))}
                {renderActions && <Td>{renderActions(row.original)}</Td>}
            </Tr>
        ))
    )

    const tableEmptyView = (
        table.getRowModel().rows.length === 0 && (
            <Tr>
                <Td colSpan={columns.length + 1} sx={{ textAlign: "-webkit-center" }}>
                    {emptyView}
                </Td>
            </Tr>
        )
    )


    const renderTableBody = () => {
        const { isFetchingNextPage } = infiniteScroll || {}
        const isTableEmpty = !table.getRowModel().rows.length
        if (isTableEmpty && !isLoading) return tableEmptyView

        if (isLoading && !isFetchingNextPage) return tableLoading
        if (infiniteScroll) return (
            <>
                {tableRows}
                {isFetchingNextPage && tableLoading}
            </>
        )

        return tableRows
    }

    const tableContent = (
        <ChakraTable
            variant="unstyled"
            sx={{
                "th, td": { paddingInline: paddingInline || 6, paddingBlock: paddingBlock || 4, fontSize: tableFontSize ? tableFontSize : 14, fontWeight: 400 },
                userSelect: "none"
            }}
        >
            <Thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <Tr key={headerGroup.id} bgColor="neutral.gray.850">
                        {headerGroup.headers.map(header => (
                            <Th
                                key={header.id}
                                textTransform="capitalize"
                                color="text.subtext.placeholder.dark"
                                cursor={enableSorting ? "pointer" : "default"}
                                sx={{ "svg": { display: "inline-block" } }}
                                onClick={enableSorting ? header.column.getToggleSortingHandler() : undefined}
                            >
                                {enableSorting ?
                                    <Flex alignItems="center" gap={1}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() && (
                                            header.column.getIsSorted() === 'desc'
                                                ? <AppIcons.DescSorting />
                                                : <AppIcons.AscSorting />
                                        )}
                                    </Flex>
                                    :
                                    flexRender(header.column.columnDef.header, header.getContext())
                                }
                            </Th>
                        ))}
                        {renderActions && <Th />}
                    </Tr>
                ))}
            </Thead>

            <Tbody
                sx={{
                    "tr": {
                        bgColor: "#1C1C1C",
                        transition: "background 0.2s",
                        _hover: { bgColor: "neutral.gray.900" }
                    }
                }}
            >
                {renderTableBody()}
            </Tbody>

            {footerContent && (
                <Tfoot>
                    <Tr bgColor="neutral.gray.1000">
                        <Td colSpan={columns.length + 1} sx={{ textAlign: "-webkit-center" }}>
                            {footerContent}
                        </Td>
                    </Tr>
                </Tfoot>
            )}
        </ChakraTable>
    )

    return (
        <TableContainer
            border="1px solid"
            borderColor="neutral.gray.850"
            borderRadius={8}
            overflow="hidden"
            overflowX="auto"
        >
            {infiniteScroll ?
                <InfiniteScroll
                    dataLength={infiniteScroll.dataLength}
                    next={infiniteScroll.next}
                    hasMore={infiniteScroll.hasMore}
                    loader={null}
                >
                    {tableContent}
                </InfiniteScroll>
                :
                tableContent
            }
        </TableContainer>
    )
}

export default Table