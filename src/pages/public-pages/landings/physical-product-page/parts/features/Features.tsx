import { Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import CustomHeading from 'pages/public-pages/landings/parts/heading/Heading'
import React from 'react'

function Features() {
    return (
        <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 14, lg: 128 }}>
            <CustomHeading title='Features and Benefits' fontSize={36} whiteSpace={"nowrap"} />
            <Flex direction={"column"} gap={14}>
                <Flex direction={"column"} gap={4}>
                    <AppTypography fontSize={20} fontWeight={700} color={"#fff"}>Unlock decentralized Affiliate Network</AppTypography>
                    <AppTypography fontSize={20} color={"#fff"}>Deploying your product on-chain connects you to our decentralized network, unlocking royalty benefits</AppTypography>
                </Flex>
                <Flex direction={"column"} gap={4}>
                    <AppTypography fontSize={20} fontWeight={700} color={"#fff"}>Unlock decentralized Affiliate Network</AppTypography>
                    <AppTypography fontSize={20} color={"#fff"}>Deploying your product on-chain connects you to our decentralized network, unlocking royalty benefits</AppTypography>
                </Flex>
                <Flex direction={"column"} gap={4}>
                    <AppTypography fontSize={20} fontWeight={700} color={"#fff"}>Unlock decentralized Affiliate Network</AppTypography>
                    <AppTypography fontSize={20} color={"#fff"}>Deploying your product on-chain connects you to our decentralized network, unlocking royalty benefits</AppTypography>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Features