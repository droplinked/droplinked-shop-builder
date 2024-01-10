import { Box, Flex, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function DetailsModalSkeleton() {
    return (
        <VStack align={"stretch"} gap={"36px"}>
            <Flex gap={"16px"} height={"54px"}>
                <AppSkeleton width="65px" height="54px" isLoaded={false}>{""}</AppSkeleton>
                <AppSkeleton width="100%" height="54px" isLoaded={false}>{""}</AppSkeleton>
            </Flex>

            <VStack align={"stretch"} gap={"18px"} color={"#c2c2c2"} as="dl">
                <Flex alignItems={"center"}>
                    <AppTypography minWidth={"175px"} fontSize={"14px"} as="dt">NFT Asset:</AppTypography>
                    <AppSkeleton width="100%" height="20px" isLoaded={false}>{""}</AppSkeleton>
                </Flex>
                <Flex alignItems={"center"}>
                    <AppTypography minWidth={"175px"} fontSize={"14px"} as="dt">Variant Price:</AppTypography>
                    <AppSkeleton width="100%" height="20px" isLoaded={false}>{""}</AppSkeleton>
                </Flex>
                <Flex alignItems={"center"}>
                    <AppTypography minWidth={"175px"} fontSize={"14px"} as="dt">Commission:</AppTypography>
                    <AppSkeleton width="100%" height="20px" isLoaded={false}>{""}</AppSkeleton>
                </Flex>
                <Flex alignItems={"center"}>
                    <AppTypography minWidth={"175px"} fontSize={"14px"} as="dt">Affiliate Collaborators:</AppTypography>
                    <AppSkeleton width="100%" height="20px" isLoaded={false}>{""}</AppSkeleton>
                </Flex>
                <Flex alignItems={"center"}>
                    <AppTypography minWidth={"175px"} fontSize={"14px"} as="dt">Deploy Hash:</AppTypography>
                    <AppSkeleton width="100%" height="20px" isLoaded={false}>{""}</AppSkeleton>
                </Flex>
            </VStack>

            <AppSkeleton width="100%" height="20px" isLoaded={false}>{""}</AppSkeleton>
        </VStack >
    )
}

export default DetailsModalSkeleton