import { BuildingLg } from 'assets/icons/System/Building/BuildingLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import { NftLg } from 'assets/icons/System/NFT/NftLg'
import React from 'react'
import Cards, { CardData } from '../../_shared/components/card/Cards'
import SectionContainer from '../../_shared/components/SectionContainer/SectionContainer'
import Perks from '../svgs/Perks'

interface SetOfPerksProps {
    t: (key: string) => string;
}

export default function SetOfPerks({ t }: SetOfPerksProps) {
    const cardsData: CardData[] = [
        {
            icon: <ConfigureLg color="#fff" />,
            title: t('setOfPerks.cards.storeSetup.title'),
            description: t('setOfPerks.cards.storeSetup.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <BuildingLg color="#fff" />,
            title: t('setOfPerks.cards.enterpriseTools.title'),
            description: t('setOfPerks.cards.enterpriseTools.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }, {
            icon: <NftLg color="#fff" />,
            title: t('setOfPerks.cards.nftIntegration.title'),
            description: t('setOfPerks.cards.nftIntegration.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle={t('setOfPerks.sectionTitle')}
            headingTitle={t('setOfPerks.headingTitle')}
            headingSubtitle={t('setOfPerks.headingSubtitle')}
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
