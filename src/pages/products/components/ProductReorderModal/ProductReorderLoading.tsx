import { Flex } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

export default function ProductReorderLoading() {
    return (
        <Flex direction="column" gap={6}>
            {Array.from({ length: 3 }).map((_, index) =>
                <LoadingItem key={index} />
            )}
        </Flex>
    )
}

const LoadingItem = () => (
    <Flex
        justifyContent="space-between"
        alignItems="center"
        gap={6}
        paddingBlock={5}
        paddingInline={12}
    >
        <AppSkeleton isLoaded={false} width={12} height={12} borderRadius={8} />
        <AppSkeleton isLoaded={false} flex={1} height={6} />
        <AppSkeleton isLoaded={false} width={6} height={6} />
    </Flex>
)