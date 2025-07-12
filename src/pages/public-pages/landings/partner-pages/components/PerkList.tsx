// Shared perks section showing benefits and features for partner offers
import { BuildingLg } from 'assets/icons/System/Building/BuildingLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import { NftLg } from 'assets/icons/System/NFT/NftLg'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import SectionContainer from '../../_shared/components/SectionContainer/SectionContainer'
import { usePartnerLanding } from '../context/PartnerLandingContext'
import Perks from '../assets/Perks'
import Cards, { CardData } from '../../_shared/components/card/Cards'
import localEn from 'locales/public-pages/landings/partner-pages/en.json'
import localAr from 'locales/public-pages/landings/partner-pages/ar.json'

export default function PerkList() {
    const { t } = useLocaleResources('public-pages/landings/partner-pages', {
        en: localEn,
        ar: localAr
    });
    const { partnerName, trialMonths } = usePartnerLanding();

    const cardsData: CardData[] = [
        {
            icon: <ConfigureLg color="#fff" />,
            title: t('perks.cards.storeSetup.title'),
            description: t('perks.cards.storeSetup.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <BuildingLg color="#fff" />,
            title: t('perks.cards.enterpriseTools.title'),
            description: t('perks.cards.enterpriseTools.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <NftLg color="#fff" />,
            title: t('perks.cards.nftIntegration.title'),
            description: t('perks.cards.nftIntegration.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle={t('perks.sectionTitle')}
            headingTitle={t('perks.headingTitle', { partnerName })}
            headingSubtitle={t('perks.headingSubtitle', { trialMonths })}
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