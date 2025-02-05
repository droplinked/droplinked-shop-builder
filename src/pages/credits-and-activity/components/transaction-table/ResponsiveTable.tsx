import { useMediaQuery } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice';
import Table from 'components/redesign/table/Table';
import { IDetailedTransaction } from 'lib/apis/credit/interfaces';
import React from 'react';
import { UseInfiniteQueryResult } from 'react-query';
import TransactionsCards from './TransactionsCards';
import TypeColumn from './TypeColumn';

export default function ResponsiveTable({ infiniteQueryResult }: { infiniteQueryResult: UseInfiniteQueryResult }) {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = infiniteQueryResult
    const transactions = data?.pages.flatMap((data: { data: { data: { data: IDetailedTransaction[] } } }) => data.data.data.data) || [];

    const formattedDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    const columns: ColumnDef<IDetailedTransaction>[] = [
        {
            accessorKey: "type",
            header: "Type",
            cell: (info) => <TypeColumn type={info.row.original.type} amountType={info.row.original.amountType} />,
        },
        {
            accessorKey: "amount",
            header: "Amount",
            cell: (info) => <FormattedPrice price={info.row.original.amount} fontSize={16} />,
        },
        {
            accessorKey: "date",
            header: "Date",
            cell: (info) => formattedDate(new Date(info.row.original.createdAt))
        },
        {
            accessorKey: "transactionId",
            header: "Transaction ID",
            cell: (info) => info.row.original.id ?? "-",
        },
        // {
        //     accessorKey: "details",
        //     header: "Details",
        //     cell: (info) => <AppTooltip label={info.row.original.details} placement='bottom-start'>{info.row.original.details}</AppTooltip>,
        // },
    ];

    return (
        isSmallerThan768 ?
            <TransactionsCards infiniteQueryResult={infiniteQueryResult} />
            : <Table
                infiniteScroll={{
                    hasMore: hasNextPage,
                    next: fetchNextPage,
                    isFetchingNextPage: isFetchingNextPage,
                    dataLength: 20,
                }}
                isLoading={isFetching}
                data={transactions}
                columns={columns}
                tableFontSize={16}
            />
    )
}
