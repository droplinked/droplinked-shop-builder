import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { IDetailsItem } from '../../types/interfaces'
import D3Badge from './common/D3Badge'
import D3Heading from './common/D3Heading'
import D3Paragraph from './common/D3Paragraph'

export default function D3CollaborationDetails() {
    return (
        <Flex
            direction={"column"}
            alignItems={"center"}
        >
            <D3Badge>Lorem ipsum</D3Badge>
            <D3Heading marginTop={6}>Exclusive Perk for D3 Members</D3Heading>
            <Details />
        </Flex>
    )
}

function Details() {
    const details: IDetailsItem[] = [
        { icon: <AppIcons.D3ShopSetup />, title: "Shop Setup Simplified", description: "Integrate your D3 domain on droplinked." },
        { icon: <AppIcons.D3EnterpriseTools />, title: "Enterprise-Level Tools", description: "Unlock advanced features to scale your business from the start." },
        { icon: <AppIcons.D3NFTIntegration />, title: "Seamless NFT Integration", description: "Create, manage, and sell NFTs on a customizable storefront." }
    ]

    return (
        <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            alignItems={"start"}
            gap={6}
            marginTop={16}
        >
            {details.map((detail, index) => (
                <DetailItem
                    key={index}
                    icon={detail.icon}
                    title={detail.title}
                    description={detail.description}
                />
            ))}
        </SimpleGrid>
    )
}

function DetailItem({ icon, title, description }: IDetailsItem) {
    return (
        <Box
            position="relative"
            display="inline-block"
            background="linear-gradient(180deg, #2BCFA1 0%, rgba(43, 207, 161, 0.12) 50%)"
            pl="2px"
        >
            <Flex direction={"column"} paddingLeft={6} bg="#010101">
                {icon}
                <AppTypography marginTop={8} fontSize={20} fontWeight={700} color={"white"}>{title}</AppTypography>
                <D3Paragraph marginTop={1}>{description as string}</D3Paragraph>
            </Flex>
        </Box>
    )
}