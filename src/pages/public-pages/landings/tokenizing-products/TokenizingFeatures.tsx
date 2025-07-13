import { CoinsLg } from 'assets/icons/Finance/Coins/CoinsLg'
import { GlobeLg } from 'assets/icons/Sign/Globe/GlobeLg'
import { NetworkLg } from 'assets/icons/System/Network/NetworkLg'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'
import localEn from 'locales/public-pages/landings/tokenizing-products/en.json'
import localAr from 'locales/public-pages/landings/tokenizing-products/ar.json'

export default function TokenizingFeatures() {
    const { t } = useLocaleResources('public-pages/landings/tokenizing-products', {
        en: localEn,
        ar: localAr
    })
    const cardsData: CardData[] = [
        {
            icon: <NetworkLg color="#fff" />,
            title: t('features.cards.blockchainBackedOwnership.title'),
            description: t('features.cards.blockchainBackedOwnership.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <CoinsLg color="#fff" />,
            title: t('features.cards.simplifyingTokenization.title'),
            description: t('features.cards.simplifyingTokenization.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <GlobeLg color="#fff" />,
            title: t('features.cards.globalTradingLiquidity.title'),
            description: t('features.cards.globalTradingLiquidity.description'),
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
