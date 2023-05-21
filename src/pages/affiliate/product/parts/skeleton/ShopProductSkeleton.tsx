import { Box, HStack, VStack } from '@chakra-ui/react'
import AppSkeleton from 'common/skeleton/AppSkeleton'
import React from 'react'

function ShopProductSkeleton() {
    return (
        <VStack align={"stretch"} padding={10} spacing={5} backgroundColor="#1c1c1c" borderRadius={3}>
            <HStack alignItems={"start"}>
                <Box width={"50%"}><AppSkeleton isLoaded={false} width="100%" height={"500px"}>{""}</AppSkeleton></Box>
                <Box width={"60%"}>
                    <VStack align={"stretch"}>
                        <AppSkeleton isLoaded={false} width="60%" height={"50px"}>{""}</AppSkeleton>
                        <AppSkeleton isLoaded={false} width="40%" height={"70px"}>{""}</AppSkeleton>
                    </VStack>
                </Box>
            </HStack>
            <VStack align={"stretch"} spacing={4}>
                <AppSkeleton isLoaded={false} width="100%" height={"50px"}>{""}</AppSkeleton>
                <AppSkeleton isLoaded={false} width="100%" height={"50px"}>{""}</AppSkeleton>
            </VStack>
        </VStack>
    )
}

export default ShopProductSkeleton