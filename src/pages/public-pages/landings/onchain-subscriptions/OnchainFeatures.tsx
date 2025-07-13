import { ChartLg } from 'assets/icons/Finance/Chart/ChartLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import { TokenpayLg } from 'assets/icons/System/Tokenpay/TokenpayLg'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'
import localEn from 'locales/public-pages/landings/onchain-subscriptions/en.json'
import localAr from 'locales/public-pages/landings/onchain-subscriptions/ar.json'

export default function OnchainFeatures() {
    const { t } = useLocaleResources('public-pages/landings/onchain-subscriptions', {
        en: localEn,
        ar: localAr
    })

    const cardsData: CardData[] = [
        {
            icon: <TokenpayLg color="#fff" />,
            title: t('features.cards.tamperProofSales.title'),
            description: t('features.cards.tamperProofSales.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <ChartLg color="#fff" />,
            title: t('features.cards.automatedTracking.title'),
            description: t('features.cards.automatedTracking.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <ConfigureLg color="#fff" />,
            title: t('features.cards.seamlessIntegration.title'),
            description: t('features.cards.seamlessIntegration.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle={t('features.sectionTitle')}
            headingTitle={t('features.headingTitle')}
            headingSubtitle={t('features.headingSubtitle')}
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
