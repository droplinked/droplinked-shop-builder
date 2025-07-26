// Shared perks section showing benefits and features for partner offers
import { BuildingLg } from 'assets/icons/System/Building/BuildingLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import { NftLg } from 'assets/icons/System/NFT/NftLg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import SectionContainer from '../../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../../_shared/components/card/Cards'
import Perks from '../assets/Perks'
import { usePartnerLanding } from '../context/PartnerLandingContext'

export default function PerkList() {
    const { t } = useLocaleResources('public-pages/landings/partner-pages');
    const { partnerName, trialMonths } = usePartnerLanding();

    const cardsData: CardData[] = [
        {
            icon: <ConfigureLg color="#fff" />,
            title: t('PerkList.cards.storeSetup.title'),
            description: t('PerkList.cards.storeSetup.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <BuildingLg color="#fff" />,
            title: t('PerkList.cards.enterpriseTools.title'),
            description: t('PerkList.cards.enterpriseTools.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <NftLg color="#fff" />,
            title: t('PerkList.cards.nftIntegration.title'),
            description: t('PerkList.cards.nftIntegration.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle={t('PerkList.sectionTitle')}
            headingTitle={t('PerkList.headingTitle', { partnerName })}
            headingSubtitle={t('PerkList.headingSubtitle', { trialMonths })}
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