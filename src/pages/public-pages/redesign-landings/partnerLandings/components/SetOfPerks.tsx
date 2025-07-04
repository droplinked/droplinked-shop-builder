// Shared perks section showing benefits and features for partner offers
import { BuildingLg } from 'assets/icons/System/Building/BuildingLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import { NftLg } from 'assets/icons/System/NFT/NftLg'
import React from 'react'
import Cards, { CardData } from '../../_shared/components/card/Cards'
import SectionContainer from '../../_shared/components/SectionContainer/SectionContainer'
import Perks from '../svgs/Perks'

export default function SetOfPerks({ partnerName, trialMonths }: { partnerName: string, trialMonths: number }) {
    const cardsData: CardData[] = [
        {
            icon: <ConfigureLg color="#fff" />,
            title: "Store Setup Simplified",
            description: "Use droplinked tools to launch your shop",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <BuildingLg color="#fff" />,
            title: "Enterprise-Level Tools",
            description: "Unlock advanced features to scale your business from the start",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }, {
            icon: <NftLg color="#fff" />,
            title: "Seamless NFT Integration",
            description: "Create, manage, and sell NFTs on a customizable storefront",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle='SET OF PERKS'
            headingTitle={`Perks for ${partnerName} Members`}
            headingSubtitle={`droplinked is offering ${trialMonths} months of a pro plan for free`}
            typographySvg={<Perks />}
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