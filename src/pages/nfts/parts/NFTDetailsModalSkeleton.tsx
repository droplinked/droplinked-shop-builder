import { Flex } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

function NFTDetailsModalSkeleton() {
    const generateSkeletonRows = (rows: number, height: string, width = "100%") =>
        Array.from({ length: rows }).map((_, key) =>
            <AppSkeleton key={key} width={width} height={height} isLoaded={false}>{""}</AppSkeleton>)

    return (
        <Flex alignItems={"flex-start"} gap={"36px"}>
            {generateSkeletonRows(1, "250px", "250px")}
            <Flex flex={1} gap={"36px"} flexDirection={"column"}>
                <Flex gap={"24px"} flexDirection={"column"}>
                    {generateSkeletonRows(1, "20px",)}
                    <Flex flexDirection={"column"} gap={"16px"}>
                        {generateSkeletonRows(3, "20px")}
                    </Flex>
                </Flex>
                <Flex gap={"24px"} flexDirection={"column"}>
                    {generateSkeletonRows(1, "20px")}
                    {generateSkeletonRows(1, "20px")}
                    {generateSkeletonRows(1, "70px")}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default NFTDetailsModalSkeleton