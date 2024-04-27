import { Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import CustomHeading from 'pages/public-pages/landings/parts/heading/Heading'
import React from 'react'

function Features() {
    return (
        <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 14, lg: 16, xl: 128 }}>
            <CustomHeading title='Features and Benefits' fontSize={36} whiteSpace={"nowrap"} />
            <Flex direction={"column"} gap={14}>
                <Flex direction={"column"} gap={4}>
                    <AppTypography fontSize={20} fontWeight={700} color={"#fff"}>Offer Perks, Discounts and Token-gated Items</AppTypography>
                    <AppTypography fontSize={20} color={"#fff"}>Grant exclusive access and discounts to customers that are community members</AppTypography>
                </Flex>
                <Flex direction={"column"} gap={4}>
                    <AppTypography fontSize={20} fontWeight={700} color={"#fff"}>Embeddable Product Tiles for Products</AppTypography>
                    <AppTypography fontSize={20} color={"#fff"}>Expand reach by promoting and selling inventory across third-party sites and platforms</AppTypography>
                </Flex>
                <Flex direction={"column"} gap={4}>
                    <AppTypography fontSize={20} fontWeight={700} color={"#fff"}>Decentralized Affiliate Network</AppTypography>
                    <AppTypography fontSize={20} color={"#fff"}>Deploying products on-chain connects them to the decentralized network, unlocking royalty benefits and more</AppTypography>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Features