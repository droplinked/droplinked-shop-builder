import { Flex } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

function Loading() {
    return (
        <>
            {Array.from({ length: 2 }).map((_, index) => (
                <Flex key={index} alignItems={"center"} gap={3}>
                    <AppSkeleton width={20} height={20} borderRadius={"50%"} isLoaded={false}>{""}</AppSkeleton>
                    <Flex direction={"column"} gap={3}>
                        <AppSkeleton width={"200px"} height={9} isLoaded={false}>{""}</AppSkeleton>
                        <AppSkeleton width={"200px"} height={6} isLoaded={false}>{""}</AppSkeleton>
                    </Flex>
                </Flex>
            ))}
        </>
    )
}

export default Loading