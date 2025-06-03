import { Flex } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import useCreditsData from 'hooks/credits-and-activity/useCreditsData'
import React from 'react'
import InfiniteScroll from "react-infinite-scroll-component"
import TransactionCard from './TransactionCard'

export default function TransactionsCards() {
    const { transactionsQuery: { data, fetchNextPage, hasNextPage, isFetchingNextPage } } = useCreditsData()
    const transactions = data?.pages.flatMap((data) => data.data.data.data) || []

    return (
        <InfiniteScroll
            dataLength={data?.pageParams?.length || 0}
            next={fetchNextPage}
            hasMore={hasNextPage || false}
            loader={
                isFetchingNextPage && (
                    <AppSkeleton isLoaded={false} mt={4} borderRadius="8px" >
                        <TransactionCard />
                    </AppSkeleton>
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
