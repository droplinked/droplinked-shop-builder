import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Input from 'components/redesign/input/Input'
import React, { useState } from 'react'
import { UseInfiniteQueryResult } from 'react-query'
import MultiSelectMenu from '../multi-select-menu/MultiSelectMenu'
import ResponsiveTable from './ResponsiveTable'

interface Props {
    infiniteQueryResult: UseInfiniteQueryResult
}

export interface Transaction {
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
    const [dataFilter, setDataFilter] = useState<string[]>([])

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
            <ResponsiveTable infiniteQueryResult={infiniteQueryResult} />
        </Flex>
    )
}
