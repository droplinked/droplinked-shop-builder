import { ColumnDef } from '@tanstack/react-table'
import Table from 'components/redesign/table/Table'
import React from 'react'
import { UseInfiniteQueryResult } from 'react-query'
import TypeColumn from './TypeColumn'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import DetailsColumn from './DetailsColumn'
import AppTooltip from 'components/common/tooltip/AppTooltip'

interface Props {
    infiniteQueryResult: UseInfiniteQueryResult
}

interface Transaction {
    type: string;
    amount: number;
    date: Date;
    transactionId: string;
    details: string;
    isInbound: boolean;
    isOutbound: boolean;
}

export default function TransactionsTable({ infiniteQueryResult }: Props) {
    const { data, isFetching, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = infiniteQueryResult
    const transactions = data?.pages.flatMap((page: { data: { data: Transaction } }) => page.data.data) || [];

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
            cell: (info) => new Date(info.row.original.date).toDateString(),
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
        <Table
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
