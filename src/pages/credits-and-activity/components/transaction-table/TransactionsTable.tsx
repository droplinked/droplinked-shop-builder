import { ColumnDef } from '@tanstack/react-table'
import Table from 'components/redesign/table/Table'
import React, { useState } from 'react'
import { UseInfiniteQueryResult } from 'react-query'
import TypeColumn from './TypeColumn'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import AppTooltip from 'components/common/tooltip/AppTooltip'
import { Flex } from '@chakra-ui/react'
import Input from 'components/redesign/input/Input'
import AppIcons from 'assest/icon/Appicons'
import MultiSelectMenu from '../multi-select-menu/MultiSelectMenu'

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
    const [dataFilter, setDataFilter] = useState<string[]>([])

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

    const Items = [
        {
            label: "Referral",
            value: "referral"
        }, {
            label: "Credits",
            value: "credits"
        }, {
            label: "Discount",
            value: "discount"
        },
        {
            label: "Voucher",
            value: "voucher"
        },
        {
            label: "Reward",
            value: "reward"
        },
        {
            label: "Subscription",
            value: "subscription"
        },
        {
            label: "Withdrawal",
            value: "withdrawal"
        }
    ]

    return (
        <Flex mt={6} flexDirection={"column"} gap={4}>
            <Flex justifyContent={"space-between"} alignItems={"center"} gap={3} flexDirection={{ base: "column", md: "row" }}>
                <Input leftElement={<AppIcons.Search />} inputProps={{ placeholder: "Search" }} inputContainerProps={{ width: { base: "100%", md: "280px" } }} />
                <MultiSelectMenu items={Items} onSelect={setDataFilter} selectedItems={dataFilter} />
            </Flex>
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
        </Flex>
    )
}
