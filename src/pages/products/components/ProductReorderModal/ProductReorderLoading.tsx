import { Flex } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import React from 'react'

export default function ProductReorderLoading() {
    return (
        <RuledGrid columns={1} nested borderColor="neutral.gray.700">
            {Array.from({ length: 3 }).map((_, index) =>
                <LoadingItem key={index} />
            )}
        </RuledGrid>
    )
}

const LoadingItem = () => (
    <Flex
        justifyContent="space-between"
        alignItems="center"
        gap={6}
        padding="20px 48px"
    >
        <AppSkeleton isLoaded={false} width={12} height={12} borderRadius={8} />
        <AppSkeleton isLoaded={false} flex={1} height={6} />
        <AppSkeleton isLoaded={false} width={6} height={6} />
    </Flex>
)