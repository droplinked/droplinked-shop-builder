import { Box, Flex, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

function DatagridSkeleton() {
    return (
        <VStack align={"stretch"} spacing={5}>
            {[1, 1, 1].map((el, key) => (
                <Flex key={key} justifyContent={"space-between"} paddingTop="15px">
                    <AppSkeleton isLoaded={false} width={"15%"} height="20px">{''}</AppSkeleton>
                    <AppSkeleton isLoaded={false} width={"15%"} height="20px">{''}</AppSkeleton>
                    <AppSkeleton isLoaded={false} width={"15%"} height="20px">{''}</AppSkeleton>
                    <AppSkeleton isLoaded={false} width={"15%"} height="20px">{''}</AppSkeleton>
                    <AppSkeleton isLoaded={false} width={"15%"} height="20px">{''}</AppSkeleton>
                    <AppSkeleton isLoaded={false} width={"15%"} height="20px">{''}</AppSkeleton>
                </Flex>
            ))}
        </VStack>
    )
}

export default DatagridSkeleton