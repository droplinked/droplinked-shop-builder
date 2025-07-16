import { CoinsLg } from 'assets/icons/Finance/Coins/CoinsLg'
import { GlobeLg } from 'assets/icons/Sign/Globe/GlobeLg'
import { NetworkLg } from 'assets/icons/System/Network/NetworkLg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'

function TokenizingProductsFeatures() {
    const { t } = useLocaleResources('public-pages/landings/tokenizing-products')

    const cardsData: CardData[] = [
        {
            icon: <NetworkLg color="#fff" />,
            title: t('TokenizingProductsFeatures.cards.blockchainBackedOwnership.title'),
            description: t('TokenizingProductsFeatures.cards.blockchainBackedOwnership.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <CoinsLg color="#fff" />,
            title: t('TokenizingProductsFeatures.cards.simplifyingTokenization.title'),
            description: t('TokenizingProductsFeatures.cards.simplifyingTokenization.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <GlobeLg color="#fff" />,
            title: t('TokenizingProductsFeatures.cards.globalTradingLiquidity.title'),
            description: t('TokenizingProductsFeatures.cards.globalTradingLiquidity.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle={t('TokenizingProductsFeatures.sectionTitle')}
            headingTitle={t('TokenizingProductsFeatures.headingTitle')}
            headingSubtitle={t('TokenizingProductsFeatures.headingSubtitle')}
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

export default TokenizingProductsFeatures