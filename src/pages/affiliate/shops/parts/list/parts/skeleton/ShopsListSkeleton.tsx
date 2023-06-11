import { Box, HStack, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

function ShopsListSkeleton() {
    return (
        <VStack align={"stretch"} spacing={8} paddingTop={6}>
            {[1, 1, 1].map((el, key) => (
                <HStack key={key} spacing={4} backgroundColor="#222" padding={6}>
                    <Box width={"15%"}>
                        <AppSkeleton isLoaded={false} width={"100%"} height={"300px"}>{""}</AppSkeleton>
                    </Box>
                    <HStack width={"70%"} spacing={3}>
                        <AppSkeleton isLoaded={false} width={"25%"} height={"300px"}>{""}</AppSkeleton>
                        <AppSkeleton isLoaded={false} width={"25%"} height={"300px"}>{""}</AppSkeleton>
                        <AppSkeleton isLoaded={false} width={"25%"} height={"300px"}>{""}</AppSkeleton>
                        <AppSkeleton isLoaded={false} width={"25%"} height={"300px"}>{""}</AppSkeleton>
                    </HStack>
                    <Box width={"15%"}>
                        <AppSkeleton isLoaded={false} height={"300px"}>{""}</AppSkeleton>
                    </Box>
                </HStack>
            ))}
        </VStack>
    )
}

export default ShopsListSkeleton