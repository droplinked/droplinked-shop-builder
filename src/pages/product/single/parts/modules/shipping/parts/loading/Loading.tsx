import { Flex } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

function Loading() {
    return (
        <Flex direction={"column"} gap={2}>
            {
                Array.from({ length: 3 }).map((_, key) =>
                    <AppSkeleton key={key} width={"100%"} height={"56px"} isLoaded={false}>{""}</AppSkeleton>)
            }
        </Flex>
    )
}

export default Loading