import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Input from 'components/redesign/input/Input'
import React from 'react'
import { UseInfiniteQueryResult } from 'react-query'
import MultiSelectMenu from '../multi-select-menu/MultiSelectMenu'
import ResponsiveTable from './ResponsiveTable'
import { ITransactionType } from 'lib/apis/credit/interfaces'

interface Props {
    infiniteQueryResult: UseInfiniteQueryResult;
    dataFilter: ITransactionType;
    setDataFilter: (filter: ITransactionType) => void;
}

export default function TransactionsTable({ infiniteQueryResult, dataFilter, setDataFilter }: Props) {
    const Items = [
        {
            label: "Referral",
            value: "REFERRAL"
        }, {
            label: "Credits",
            value: "CREDIT_BALANCE"
        },
        {
            label: "Reward",
            value: "GAMIFICATION_REWARD"
        },
        {
            label: "Subscription",
            value: "SUBSCRIPTION_UPDATE"
        },
        {
            label: "Withdrawal",
            value: "WITHDRAW"
        },
        {
            label: "Order",
            value: "ORDER"
        }
    ]

    return (
        <Flex mt={6} flexDirection={"column"} gap={4}>
            <Flex justifyContent={"space-between"} alignItems={"center"} gap={3} flexDirection={{ base: "column", md: "row" }}>
                <Input leftElement={<AppIcons.Search />} inputProps={{ placeholder: "Search" }} inputGroupProps={{ width: { base: "100%", md: "280px" } }} />
                <MultiSelectMenu items={Items} onSelect={setDataFilter} selectedItems={dataFilter} />
            </Flex>
            <ResponsiveTable infiniteQueryResult={infiniteQueryResult} />
        </Flex>
    )
}
