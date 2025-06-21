import { BuildingLg } from 'assets/icons/System/Building/BuildingLg';
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg';
import { NftLg } from 'assets/icons/System/NFT/NftLg';
import { Cards } from 'pages/public-pages/redesign-landings/components/card';
import React from 'react';
import { CardData } from '../../components/card/Cards';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import SectionContainer from '../../components/SectionContainer/SectionContainer';

export default function SetOfPerks() {
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
    ];

    return (
        <MaxWidthWrapper my="80px">
            <SectionContainer
                icon='story'
                sectionTitle='SET OF PERKS'
                headingTitle='Perks for Crossmint Members'
                headingSubtitle='droplinked is offering 3 months of a pro plan for free'
                typographyText='Perks'
            />
            <Cards
                cardsData={cardsData}
                templateColumns={{
                    base: '1fr',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(3, 1fr)'
                }}
            />
        </MaxWidthWrapper>
    )
}
