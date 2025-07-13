import { ShieldLg } from 'assets/icons/System/Shield/ShieldLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { UnlockLg } from 'assets/icons/System/Unlock/UnlockLg'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'
import localEn from 'locales/public-pages/landings/tokenpay/en.json'
import localAr from 'locales/public-pages/landings/tokenpay/ar.json'

function TokenpayFeatures() {
    const { t } = useLocaleResources('public-pages/landings/tokenpay', {
        en: localEn,
        ar: localAr
    })
    const cardsData: CardData[] = [
        {
            icon: <DesignLg color="#fff" />,
            title: t('features.cards.personalizedMarketplaces.title'),
            description: t('features.cards.personalizedMarketplaces.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <UnlockLg color="#fff" />,
            title: t('features.cards.unlockTokenPotential.title'),
            description: t('features.cards.unlockTokenPotential.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <ShieldLg color="#fff" />,
            title: t('features.cards.trustInEveryTransaction.title'),
            description: t('features.cards.trustInEveryTransaction.description'),
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

export default TokenpayFeatures