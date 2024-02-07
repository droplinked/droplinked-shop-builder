import { Flex, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

function DetailsModalSkeleton() {
    const generateSkeletonRows = (rows: number, height: string, width = "100%") => {
        return Array.from({ length: rows }).map((_, key) =>
            <AppSkeleton key={key} width={width} height={height} isLoaded={false}>{""}</AppSkeleton>)
    }

    return (
        <VStack align={"stretch"} gap={"36px"}>
            <Flex gap={"16px"} height={"54px"}>
                {generateSkeletonRows(1, "54px", "54px")}
                <Flex flex={1} direction={"column"} justifyContent={"space-between"} height={"54px"}>
                    {generateSkeletonRows(2, "20px")}
                </Flex>
            </Flex>
            <VStack align={"stretch"} gap={"18px"} color={"#c2c2c2"} as="dl">
                {generateSkeletonRows(3, "20px")}
            </VStack>
            {generateSkeletonRows(1, "20px")}
        </VStack >
    )
}

export default DetailsModalSkeleton