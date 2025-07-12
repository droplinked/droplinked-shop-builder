import { CodeLg } from 'assets/icons/Coding/Code/CodeLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { CartLg } from 'assets/icons/System/Cart/CartLg'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'
import localEn from 'locales/public-pages/landings/product-tiles/en.json'
import localAr from 'locales/public-pages/landings/product-tiles/ar.json'

function ProductTilesFeatures() {
    const { t } = useLocaleResources('public-pages/landings/product-tiles', {
        en: localEn,
        ar: localAr
    })
    const cardsData: CardData[] = [
        {
            icon: <CodeLg color="#fff" />,
            title: t('features.cards.easyDeployment.title'),
            description: t('features.cards.easyDeployment.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <CartLg color="#fff" />,
            title: t('features.cards.seamlessCheckout.title'),
            description: t('features.cards.seamlessCheckout.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <DesignLg color="#fff" />,
            title: t('features.cards.customizableDesigns.title'),
            description: t('features.cards.customizableDesigns.description'),
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

export default ProductTilesFeatures