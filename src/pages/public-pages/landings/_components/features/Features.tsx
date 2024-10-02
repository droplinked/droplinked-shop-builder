import { Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { IFeatureGroup } from '../../types/interfaces'
import CustomHeading from '../heading/Heading'

export default function Features({ features }: { features?: IFeatureGroup[] }) {
    const defaultFeatureGroups: IFeatureGroup[] = [
        {
            features: [
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
                }
            ]
        }
    ]
    const featureGroups = features ?? defaultFeatureGroups

    return (
        <>
            {featureGroups.map(({ title, features }, index) => (
                <Flex
                    key={index}
                    width="100%"
                    direction={{ base: 'column', lg: 'row' }}
                    gap={{ base: 6, lg: 4, xl: 6 }}
                >
                    <CustomHeading
                        title={title || "Features and Benefits"}
                        width={{ base: "100%", lg: "400px" }}
                        flexShrink={0}
                        fontSize={{ base: 20, lg: 28 }}
                    />
                    <Flex direction="column" gap={{ base: 6, lg: 9, xl: 14 }}>
                        {features.map((feature, index) => <FeatureItem key={index} {...feature} />)}
                    </Flex>
                </Flex>
            ))}
        </>
    )
}

const FeatureItem = ({ title, description }) => (
    <Flex direction="column" gap={4} sx={{ color: '#fff' }}>
        <AppTypography fontSize={{ base: 18, md: 20 }} fontWeight={700}>{title}</AppTypography>
        <AppTypography fontSize={{ base: 16, xl: 18 }}>{description}</AppTypography>
    </Flex>
)