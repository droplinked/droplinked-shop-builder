import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'
import { CoinsLg } from 'assets/icons/Finance/Coins/CoinsLg'
import { RocketLg } from 'assets/icons/Action/Rocket/RocketLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localEn from 'locales/public-pages/landings/custom-tokens/en.json'
import localAr from 'locales/public-pages/landings/custom-tokens/ar.json'

function CustomTokensFeatures() {
    const { t } = useLocaleResources('public-pages/landings/custom-tokens', { en: localEn, ar: localAr })

    const cardsData: CardData[] = [
        {
            icon: <CoinsLg color="#fff" />,
            title: t('features.cards.tokenPoweredTransactions.title'),
            description: t('features.cards.tokenPoweredTransactions.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <RocketLg color="#fff" />,
            title: t('features.cards.boostingTokenUtility.title'),
            description: t('features.cards.boostingTokenUtility.description'),
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
                templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            />
        </SectionContainer>
    )
}

export default CustomTokensFeatures