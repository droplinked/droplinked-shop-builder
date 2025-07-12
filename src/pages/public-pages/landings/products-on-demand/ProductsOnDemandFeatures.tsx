import { CodeLg } from 'assets/icons/Coding/Code/CodeLg'
import { ReceivemoneyLg } from 'assets/icons/Finance/ReceiveMoney/ReceivemoneyLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'
import localEn from 'locales/public-pages/landings/products-on-demand/en.json'
import localAr from 'locales/public-pages/landings/products-on-demand/ar.json'

function ProductsOnDemandFeatures() {
    const { t } = useLocaleResources('public-pages/landings/products-on-demand', {
        en: localEn,
        ar: localAr
    })
    const cardsData: CardData[] = [
        {
            icon: <DesignLg color="#fff" />,
            title: t('features.cards.merchandiseDesignEngine.title'),
            description: t('features.cards.merchandiseDesignEngine.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <CodeLg color="#fff" />,
            title: t('features.cards.customizationWithCssHtml.title'),
            description: t('features.cards.customizationWithCssHtml.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <ReceivemoneyLg color="#fff" />,
            title: t('features.cards.monetizeWithoutOverhead.title'),
            description: t('features.cards.monetizeWithoutOverhead.description'),
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

export default ProductsOnDemandFeatures