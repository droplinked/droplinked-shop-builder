import { Flex } from '@chakra-ui/react'
import React from 'react'
import { UseInfiniteQueryResult } from 'react-query';
import AppTypography from 'components/common/typography/AppTypography';
import InfiniteScroll from "react-infinite-scroll-component";
import TransactionCard from './TransactionCard';
import { IDetailedTransaction } from 'lib/apis/credit/interfaces';

export default function TransactionsCards({ infiniteQueryResult }: { infiniteQueryResult: UseInfiniteQueryResult }) {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = infiniteQueryResult
    const transactions = data?.pages.flatMap((data: { data: { data: { data: IDetailedTransaction[] } } }) => data.data.data.data) || [];

    return (
        <InfiniteScroll
            dataLength={data?.pageParams?.length || 0}
            next={fetchNextPage}
            hasMore={hasNextPage || false}
            loader={
                isFetchingNextPage && (
                    <Flex gap={4} flexDirection="column" p={4} bg="#141414" borderRadius="8px" border="1px solid #292929">
                        <Flex flexDirection="column" gap={4} p={4} background="#1C1C1C" borderRadius="8px">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Flex key={index} justifyContent="space-between" alignItems="center">
                                    <AppTypography color="#7b7b7b" fontSize={14}>Loading...</AppTypography>
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>
                )
            }
        >
            <Flex flexDirection="column" gap={4}>
                {transactions.map((transaction) => (
                    <TransactionCard key={transaction.id} transaction={transaction} />
                ))}
            </Flex>
        </InfiniteScroll>
    )
}
