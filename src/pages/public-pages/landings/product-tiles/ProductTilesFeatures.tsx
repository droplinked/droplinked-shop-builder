import { CodeLg } from 'assets/icons/Coding/Code/CodeLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { CartLg } from 'assets/icons/System/Cart/CartLg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'

function ProductTilesFeatures() {
    const { t } = useLocaleResources('public-pages/landings/product-tiles')

    const cardsData: CardData[] = [
        {
            icon: <CodeLg color="#fff" />,
            title: t('ProductTilesFeatures.cards.easyDeployment.title'),
            description: t('ProductTilesFeatures.cards.easyDeployment.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <CartLg color="#fff" />,
            title: t('ProductTilesFeatures.cards.seamlessCheckout.title'),
            description: t('ProductTilesFeatures.cards.seamlessCheckout.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <DesignLg color="#fff" />,
            title: t('ProductTilesFeatures.cards.customizableDesigns.title'),
            description: t('ProductTilesFeatures.cards.customizableDesigns.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle={t('ProductTilesFeatures.sectionTitle')}
            headingTitle={t('ProductTilesFeatures.headingTitle')}
            headingSubtitle={t('ProductTilesFeatures.headingSubtitle')}
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