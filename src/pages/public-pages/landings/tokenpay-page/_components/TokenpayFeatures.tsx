import { Flex, Grid } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import Container from '../../_components/container/Container'
import CustomHeading from '../../_components/heading/Heading'

export default function TokenpayFeatures() {
    const features = [
        { icon: <AppIcons.Personalize />, title: 'Personalize Your Marketplace', description: 'Create a shop that mirrors the unique essence of your community, offering a mix of on-demand and additional items tailored to your audience.' },
        { icon: <AppIcons.Unlock />, title: 'Unlock Token Potential', description: 'Elevate community engagement by enabling token-based transactions for a variety of goods. Droplinked bridges the gap between digital assets and real-world utility.' },
        { icon: <AppIcons.Brain />, title: 'Streamline Your Ideas', description: 'Instantly materialize products with our on-demand service, simplifying the path from concept to creation. Enhance your shop with custom items that captivate your community.' },
        { icon: <AppIcons.Trust />, title: 'Trust in Every Transaction', description: "Every purchase is backed by blockchain's inherent security and transparency. Experience peace of mind in a marketplace where integrity is paramount, and every token transaction is an open book." }
    ]

    return (
        <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            templateRows="repeat(2, 1fr)"
            gap={9}
        >
            {features.map((feature) => <Feature key={feature.title} {...feature} />)}
        </Grid>
    )
}

function Feature({ icon, title, description }) {
    return (
        <Container>
            {icon}
            <Flex direction="column" gap={6} >
                <CustomHeading title={title} width="fit-content" fontSize={20} />
                <AppTypography fontSize={16} color="white">{description}</AppTypography>
            </Flex>
        </Container>
    )
}