import { Box, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

function SingleShopSkeleton() {
    return (
        <VStack align={"stretch"} spacing={5}>
            <Box backgroundColor={"#1C1C1C"}>
                <AppSkeleton isLoaded={false} height={"150px"}>{""}</AppSkeleton>
            </Box>
            <AppSkeleton isLoaded={false} height={"300px"}>{""}</AppSkeleton>
        </VStack>
    )
}

export default SingleShopSkeleton