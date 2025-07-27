import { RocketLg } from 'assets/icons/Action/Rocket/RocketLg'
import { CoinsLg } from 'assets/icons/Finance/Coins/CoinsLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'

function CustomTokensFeatures() {
    const { t } = useLocaleResources('public-pages/landings/custom-tokens')

    const cardsData: CardData[] = [
        {
            icon: <CoinsLg color="#fff" />,
            title: t('CustomTokensFeatures.cards.tokenPoweredTransactions.title'),
            description: t('CustomTokensFeatures.cards.tokenPoweredTransactions.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <RocketLg color="#fff" />,
            title: t('CustomTokensFeatures.cards.boostingTokenUtility.title'),
            description: t('CustomTokensFeatures.cards.boostingTokenUtility.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <ConfigureLg color="#fff" />,
            title: t('CustomTokensFeatures.cards.seamlessIntegration.title'),
            description: t('CustomTokensFeatures.cards.seamlessIntegration.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle={t('CustomTokensFeatures.sectionTitle')}
            headingTitle={t('CustomTokensFeatures.headingTitle')}
            headingSubtitle={t('CustomTokensFeatures.headingSubtitle')}
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