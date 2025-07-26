import { CodeLg } from 'assets/icons/Coding/Code/CodeLg'
import { ReceivemoneyLg } from 'assets/icons/Finance/ReceiveMoney/ReceivemoneyLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'

function ProductsOnDemandFeatures() {
    const { t } = useLocaleResources('public-pages/landings/products-on-demand')

    const cardsData: CardData[] = [
        {
            icon: <DesignLg color="#fff" />,
            title: t('ProductsOnDemandFeatures.cards.merchandiseDesignEngine.title'),
            description: t('ProductsOnDemandFeatures.cards.merchandiseDesignEngine.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <CodeLg color="#fff" />,
            title: t('ProductsOnDemandFeatures.cards.customizationWithCssHtml.title'),
            description: t('ProductsOnDemandFeatures.cards.customizationWithCssHtml.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <ReceivemoneyLg color="#fff" />,
            title: t('ProductsOnDemandFeatures.cards.monetizeWithoutOverhead.title'),
            description: t('ProductsOnDemandFeatures.cards.monetizeWithoutOverhead.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle={t('ProductsOnDemandFeatures.sectionTitle')}
            headingTitle={t('ProductsOnDemandFeatures.headingTitle')}
            headingSubtitle={t('ProductsOnDemandFeatures.headingSubtitle')}
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

export default ProductsOnDemandFeatures