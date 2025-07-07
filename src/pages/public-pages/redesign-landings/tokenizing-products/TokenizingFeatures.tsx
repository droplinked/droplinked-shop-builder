import { CoinsLg } from 'assets/icons/Finance/Coins/CoinsLg'
import { GlobeLg } from 'assets/icons/Sign/Globe/GlobeLg'
import { NetworkLg } from 'assets/icons/System/Network/NetworkLg'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'

export default function TokenizingFeatures() {
    const cardsData: CardData[] = [
        {
            icon: <NetworkLg color="#fff" />,
            title: "Blockchain Backed Ownership",
            description: "Transform goods into tokenized assets that are secured onchain for tamper-proof ownership",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <CoinsLg color="#fff" />,
            title: "Simplifying Tokenization",
            description: "Easily tokenize luxury collectibles, physical items and other assets with NFT technology that enables custody ownership for distribution",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }, {
            icon: <GlobeLg color="#fff" />,
            title: "Global Trading & Liquidity",
            description: "Unlock new global markets by making tokenized inventory tradable, increasing liquidity and reach with value-add partners and businesses",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle='SET OF FEATURES'
            headingTitle='Tools to Track Inventory'
            headingSubtitle={`Create digital records of inventory and assets onchain\nto ensure secure and transparent distribution and trading`}
            typographySvg={<Features />}
        >
            <Cards
                cardsData={cardsData}
                hasHoverEffect={true}
                templateColumns={{
                    base: '1fr',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(3, 1fr)'
                }}
            />
        </SectionContainer>
    )
}
