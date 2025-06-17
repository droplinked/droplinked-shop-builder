import { Flex } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

export default function LoadingSkeleton({ isFetching }: { isFetching: boolean }) {
    return (
        isFetching && (
            <Flex flexDirection="column" gap={4}>
                {Array.from({ length: 4 }).map((_, index) =>
                    <AppSkeleton borderRadius={8} isLoaded={false} height="50px" key={index} />
                )}
            </Flex>
        )
    )
}
