import React from 'react'
import { Transaction } from './TransactionsTable';
import { useMediaQuery } from '@chakra-ui/react';
import TypeColumn from './TypeColumn';
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice';
import { ColumnDef } from '@tanstack/react-table';
import AppTooltip from 'components/common/tooltip/AppTooltip';
import Table from 'components/redesign/table/Table';
import { UseInfiniteQueryResult } from 'react-query';
import MobileCard from './MobileCard';

export default function ResponsiveTable({ infiniteQueryResult }: { infiniteQueryResult: UseInfiniteQueryResult }) {
    const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = infiniteQueryResult
    const transactions = data?.pages.flatMap((page: { data: { data: Transaction } }) => page.data.data) || [];
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    const formattedDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }


    const columns: ColumnDef<Transaction>[] = [
        {
            accessorKey: "type",
            header: "Type",
            cell: (info) => <TypeColumn data={info.row.original} />,
        },
        {
            accessorKey: "amount",
            header: "Amount",
            cell: (info) => <FormattedPrice price={info.row.original.amount} fontSize={16} />,
        },
        {
            accessorKey: "date",
            header: "Date",
            cell: (info) => formattedDate(info.row.original.date),
        },
        {
            accessorKey: "transactionId",
            header: "Transaction ID",
            cell: (info) => info.row.original.transactionId ?? "-",
        },
        {
            accessorKey: "details",
            header: "Details",
            cell: (info) => <AppTooltip label={info.row.original.details} placement='bottom-start'>{info.row.original.details}</AppTooltip>,
        },
    ];
    return (
        isSmallerThan768 ?
            <MobileCard infiniteQueryResult={infiniteQueryResult} />
            : <Table
                infiniteScroll={{
                    hasMore: hasNextPage,
                    next: fetchNextPage,
                    isFetchingNextPage: isFetchingNextPage,
                    dataLength: data?.pageParams?.length || 0,
                }}
                isLoading={isFetching}
                data={transactions}
                columns={columns}
                tableFontSize={16}
            />
    )
}
