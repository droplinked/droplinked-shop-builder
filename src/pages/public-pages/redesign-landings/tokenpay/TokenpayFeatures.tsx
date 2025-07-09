import { ShieldLg } from 'assets/icons/System/Shield/ShieldLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { UnlockLg } from 'assets/icons/System/Unlock/UnlockLg'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'

function TokenpayFeatures() {
    const cardsData: CardData[] = [
        {
            icon: <DesignLg color="#fff" />,
            title: "Personalized Marketplaces",
            description: "Create an experience that mirrors the unique essence of the community, offering a mix of merchandise and services",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <UnlockLg color="#fff" />,
            title: "Unlock Token Potential",
            description: "Elevate community engagement by enabling token-based transactions. droplinked bridges the gap between digital assets and real-world utility",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <ShieldLg color="#fff" />,
            title: "Trust in Every Transaction",
            description: "Every purchase is backed by blockchain's inherent security and transparency. Experience peace of mind in a marketplace where integrity is paramount on every token transaction",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
        
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle='SET OF FEATURES'
            headingTitle='Front-End Modularity'
            headingSubtitle='Headless and fully customizable storefront setup'
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

export default TokenpayFeatures