import { CodeLg } from 'assets/icons/Coding/Code/CodeLg'
import { ReceivemoneyLg } from 'assets/icons/Finance/ReceiveMoney/ReceivemoneyLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'

function ProductsOnDemandFeatures() {
    const cardsData: CardData[] = [
        {
            icon: <DesignLg color="#fff" />,
            title: "Merchandise Design Engine",
            description: "Utilize our template engine tools for easy customization of products offered on demand",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <CodeLg color="#fff" />,
            title: "Customization with CSS & HTML ",
            description: "Ready to go further? Dive into customization with implementing CSS and HTML coding",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <ReceivemoneyLg color="#fff" />,
            title: "Monetize Without Overhead ",
            description: "Use IP such as logos, trademarks and any assets to offer premium merchandise instantly",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle='SET OF FEATURES'
            headingTitle='No Minimum Requirements'
            headingSubtitle="Design and offer an entire catalog of items that are produced as orders flow in"
            typographySvg={<Features />}
        >
            <Cards
                cardsData={cardsData}
                hasHoverEffect={true}
                templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            />
        </SectionContainer>
    )
}

export default ProductsOnDemandFeatures