import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { ShieldLg } from 'assets/icons/System/Shield/ShieldLg'
import { UnlockLg } from 'assets/icons/System/Unlock/UnlockLg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'

function TokenpayFeatures() {
    const { t } = useLocaleResources('public-pages/landings/tokenpay')

    const cardsData: CardData[] = [
        {
            icon: <DesignLg color="#fff" />,
            title: t('TokenpayFeatures.cards.personalizedMarketplaces.title'),
            description: t('TokenpayFeatures.cards.personalizedMarketplaces.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <UnlockLg color="#fff" />,
            title: t('TokenpayFeatures.cards.unlockTokenPotential.title'),
            description: t('TokenpayFeatures.cards.unlockTokenPotential.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <ShieldLg color="#fff" />,
            title: t('TokenpayFeatures.cards.trustInEveryTransaction.title'),
            description: t('TokenpayFeatures.cards.trustInEveryTransaction.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }

    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle={t('TokenpayFeatures.sectionTitle')}
            headingTitle={t('TokenpayFeatures.headingTitle')}
            headingSubtitle={t('TokenpayFeatures.headingSubtitle')}
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

export default TokenpayFeatures