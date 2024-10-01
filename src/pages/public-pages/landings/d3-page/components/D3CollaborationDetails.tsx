import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { IDetailsItem } from '../../types/interfaces'
import D3Heading from './common/D3Heading'
import D3Paragraph from './common/D3Paragraph'

export default function D3CollaborationDetails() {
    return (
        <Flex direction={"column"}>
            <D3Heading textAlign={"center"}>Exclusive Perk for D3 Members</D3Heading>
            <Details />
        </Flex>
    )
}

function Details() {
    const details: IDetailsItem[] = [
        { icon: <AppIcons.D3ShopSetup className='d3-icon' />, title: "Store Setup Simplified", description: "Integrate your D3 domain on droplinked and launch your shop." },
        { icon: <AppIcons.D3EnterpriseTools className='d3-icon' />, title: "Enterprise-Level Tools", description: "Unlock advanced features to scale your business from the start." },
        { icon: <AppIcons.D3NFTIntegration className='d3-icon' />, title: "Seamless NFT Integration", description: "Create, manage, and sell NFTs on a customizable storefront." }
    ]

    return (
        <SimpleGrid
            columns={{ base: 1, lg: 3 }}
            alignItems={"start"}
            gap={{ base: 12, lg: 4, xl: 6 }}
            marginTop={{ base: 12, md: 16 }}
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
            <Flex direction={"column"} paddingLeft={{ base: 4, md: 6 }} bg="#010101">
                {icon}
                <AppTypography marginTop={{ base: 4, md: 8 }} fontSize={{ base: 18, md: 20 }} fontWeight={700} color={"white"}>
                    {title}
                </AppTypography>
                <D3Paragraph marginTop={1}>{description as string}</D3Paragraph>
            </Flex>
        </Box>
    )
}