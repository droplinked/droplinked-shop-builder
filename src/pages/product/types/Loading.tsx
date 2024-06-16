import { Flex } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

function Loading() {
    return (
        <Flex direction={"column"} gap={5}>
            {
                Array.from({ length: 4 }).map((_, index) =>
                    <AppSkeleton key={index} height={"124px"} borderRadius={8} isLoaded={false}>{""}</AppSkeleton>
                )
            }
        </Flex>
    )
}

export default Loading