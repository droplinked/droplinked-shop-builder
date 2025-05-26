import { Flex } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { UseInfiniteQueryResult } from 'react-query'
import { IOrders } from 'pages/purchase-history/interface'
import MobileCards from './MobileCards'

interface Props {
    purchaseHistoryQuery: UseInfiniteQueryResult<any, unknown>
}

export default function MobileTable({ purchaseHistoryQuery }: Props) {
    const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = purchaseHistoryQuery
    const orders = data?.pages.flatMap(page => page.data.data.data) || []

    if (isLoading) {
        return Array.from({ length: 5 }, (_, index) => (
            <AppSkeleton key={index} isLoaded={false} mt={4} borderRadius="8px" width="100%">
                <MobileCards item={{} as IOrders} />
            </AppSkeleton>
        ))
    }

    return (
        <InfiniteScroll
            dataLength={data?.pageParams?.length || 0}
            next={fetchNextPage}
            hasMore={hasNextPage || false}
            loader={
                isFetchingNextPage && (
                    <AppSkeleton isLoaded={false} mt={4} borderRadius="8px" >
                        <MobileCards item={{} as IOrders} />
                    </AppSkeleton>
                )
            }
        >
            <Flex flexDirection="column" gap={4}>
                {orders.map((item: IOrders) => (
                    <MobileCards item={item} key={item._id} />
                ))}
            </Flex>
        </InfiniteScroll>
    )
}
