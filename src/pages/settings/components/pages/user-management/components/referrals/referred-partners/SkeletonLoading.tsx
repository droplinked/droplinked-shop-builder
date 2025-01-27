import { Flex } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

export default function SkeletonLoading() {
    return (
        <Flex width={"100%"} gap={4} flexDirection={"column"}>
            {Array.from({ length: 3 }).map((item, index) => (
                <AppSkeleton borderRadius={"8px"} width={"100%"} height={"48px"} isLoaded={false} />
            ))}
        </Flex>
    )
}
