import { ChartLg } from 'assets/icons/Finance/Chart/ChartLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import { TokenpayLg } from 'assets/icons/System/Tokenpay/TokenpayLg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'

function OnchainSubscriptionsFeatures() {
    const { t } = useLocaleResources('public-pages/landings/onchain-subscriptions')

    const cardsData: CardData[] = [
        {
            icon: <TokenpayLg color="#fff" />,
            title: t('OnchainSubscriptionsFeatures.cards.tamperProofSales.title'),
            description: t('OnchainSubscriptionsFeatures.cards.tamperProofSales.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <ChartLg color="#fff" />,
            title: t('OnchainSubscriptionsFeatures.cards.automatedTracking.title'),
            description: t('OnchainSubscriptionsFeatures.cards.automatedTracking.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <ConfigureLg color="#fff" />,
            title: t('OnchainSubscriptionsFeatures.cards.seamlessIntegration.title'),
            description: t('OnchainSubscriptionsFeatures.cards.seamlessIntegration.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle={t('OnchainSubscriptionsFeatures.sectionTitle')}
            headingTitle={t('OnchainSubscriptionsFeatures.headingTitle')}
            headingSubtitle={t('OnchainSubscriptionsFeatures.headingSubtitle')}
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

export default OnchainSubscriptionsFeatures