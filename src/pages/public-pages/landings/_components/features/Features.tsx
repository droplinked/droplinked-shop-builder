import { Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { ILandingPageTemplate } from '../../types/interfaces'
import CustomHeading from '../heading/Heading'

interface Props {
    features?: ILandingPageTemplate["features"]
}

export default function Features({ features }: Props) {
    const featuresList = features ?? [
        {
            title: 'Offer Perks, Discounts and Token-gated Items',
            description: 'Grant exclusive access and discounts to customers that are community members',
        },
        {
            title: 'Embeddable Product Tiles for Products',
            description: 'Expand reach by promoting and selling inventory across third-party sites and platforms',
        },
        {
            title: 'Decentralized Affiliate Network',
            description: 'Deploying products onchain connects them to the decentralized network, unlocking royalty benefits and more',
        },
    ]

    return (
        <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 14, lg: 16, xl: 128 }}>
            <CustomHeading title='Features and Benefits' flexShrink={0} fontSize={36} />
            <Flex direction="column" gap={14}>
                {featuresList.map(({ title, description }, index) => (
                    <FeatureItem key={index} title={title} description={description} />
                ))}
            </Flex>
        </Flex>
    )
}

const FeatureItem = ({ title, description }) => (
    <Flex direction="column" gap={4}>
        <AppTypography fontSize={20} fontWeight={700} color="#fff">{title}</AppTypography>
        <AppTypography fontSize={20} color="#fff">{description}</AppTypography>
    </Flex>
)