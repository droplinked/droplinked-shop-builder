import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Transaction } from './TransactionsTable';
import { UseInfiniteQueryResult } from 'react-query';
import TypeColumn from './TypeColumn';
import AppTypography from 'components/common/typography/AppTypography';
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice';

export default function MobileCard({ infiniteQueryResult }: { infiniteQueryResult: UseInfiniteQueryResult }) {
    const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = infiniteQueryResult
    const transactions = data?.pages.flatMap((page: { data: { data: Transaction } }) => page.data.data) || [];

    const formattedDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    return (
        <Flex flexDirection={"column"} gap={4}>
            {transactions.map((transaction) => {
                const { amount, date, details, transactionId } = transaction
                return (
                    <Flex gap={4} flexDirection={"column"} p={4} bg={"#141414"} borderRadius={"8px"} border={"1px solid #292929"}>
                        <TypeColumn data={transaction} />
                        <Flex flexDirection={"column"} gap={4} p={4} background={"#1C1C1C"} borderRadius={"8px"}>
                            <Flex justifyContent={"space-between"} alignItems={"center"}>
                                <AppTypography color={"#7b7b7b"} fontSize={14}>Amount</AppTypography>
                                <FormattedPrice price={amount} />
                            </Flex>
                            <Flex justifyContent={"space-between"} alignItems={"center"}>
                                <AppTypography color={"#7b7b7b"} fontSize={14}>Date</AppTypography>
                                <AppTypography color={"#fff"} fontSize={14}>{formattedDate(date)}</AppTypography>
                            </Flex>
                            <Flex justifyContent={"space-between"} alignItems={"center"}>
                                <AppTypography color={"#7b7b7b"} fontSize={14}>Transaction ID</AppTypography>
                                <AppTypography color={"#fff"} fontSize={14}>{transactionId}</AppTypography>
                            </Flex>
                            <Flex justifyContent={"space-between"} alignItems={"center"}>
                                <AppTypography color={"#7b7b7b"} fontSize={14}>Details</AppTypography>
                                <AppTypography color={"#fff"} fontSize={14}>{details}</AppTypography>
                            </Flex>
                        </Flex>
                    </Flex>
                )
            })}
        </Flex>
    )
}
