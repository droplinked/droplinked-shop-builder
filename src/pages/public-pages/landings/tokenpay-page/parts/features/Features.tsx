import { Grid } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import Feature from './parts/feature-component/Feature'

function Features() {
    const features = [
        { icon: <AppIcons.Personalize />, title: 'Personalize Your Marketplace', description: 'Create a shop that mirrors the unique essence of your community, offering a mix of on-demand and additional items tailored to your audience.' },
        { icon: <AppIcons.Unlock />, title: 'Unlock Token Potential', description: 'Elevate community engagement by enabling token-based transactions for a variety of goods. Droplinked bridges the gap between digital assets and real-world utility.' },
        { icon: <AppIcons.Brain />, title: 'Streamline Your Ideas', description: 'Instantly materialize products with our on-demand service, simplifying the path from concept to creation. Enhance your shop with custom items that captivate your community.' },
        { icon: <AppIcons.Trust />, title: 'Trust in Every Transaction', description: "Every purchase is backed by blockchain's inherent security and transparency. Experience peace of mind in a marketplace where integrity is paramount, and every token transaction is an open book." }
    ]

    return (
        <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            templateRows={"repeat(2, 1fr)"}
            gap={9}
        >
            {features.map(({ icon, title, description }, index) =>
                <Feature key={index} icon={icon} title={title} description={description} />
            )}

        </Grid>
    )
}

export default Features