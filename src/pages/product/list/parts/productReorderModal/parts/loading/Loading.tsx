import { Flex } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

function Loading() {
    return (
        <Flex direction={"column"} gap={6}>
            {
                Array.from({ length: 3 }).map((_, index) =>
                    <Flex key={index} justifyContent={"space-between"} alignItems={"center"}>
                        <Flex alignItems={"center"} gap={3}>
                            <AppSkeleton isLoaded={false} width={12} height={12}>{" "}</AppSkeleton>
                            <AppSkeleton isLoaded={false} width={"200px"} height={6}>{" "}</AppSkeleton>
                        </Flex>
                        <AppSkeleton isLoaded={false} width={6} height={6}>{" "}</AppSkeleton>
                    </Flex>
                )
            }
        </Flex>
    )
}

export default Loading