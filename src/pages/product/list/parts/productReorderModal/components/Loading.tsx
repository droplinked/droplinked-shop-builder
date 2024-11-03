import { Flex } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

export default function Loading() {
    return (
        <Flex direction="column" gap={6}>
            {Array.from({ length: 3 }).map((_, index) =>
                <LoadingItem key={index} />
            )}
        </Flex>
    )
}

const LoadingItem = () => (
    <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" gap={3}>
            <AppSkeleton isLoaded={false} width={12} height={12} />
            <AppSkeleton isLoaded={false} width="200px" height={6} />
        </Flex>
        <AppSkeleton isLoaded={false} width={6} height={6} />
    </Flex>
)