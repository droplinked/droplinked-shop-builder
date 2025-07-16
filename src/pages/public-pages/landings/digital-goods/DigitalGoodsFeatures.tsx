import { CodeLg } from 'assets/icons/Coding/Code/CodeLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { Layout2Lg } from 'assets/icons/StyleDesigner/Layout2/Layout2Lg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'

function DigitalGoodsFeatures() {
    const { t } = useLocaleResources('public-pages/landings/digital-goods')

    const cardsData: CardData[] = [
        {
            icon: <Layout2Lg color="#fff" />,
            title: t('DigitalGoodsFeatures.cards.templateEngineTools.title'),
            description: t('DigitalGoodsFeatures.cards.templateEngineTools.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <CodeLg color="#fff" />,
            title: t('DigitalGoodsFeatures.cards.customizationWithCssHtml.title'),
            description: t('DigitalGoodsFeatures.cards.customizationWithCssHtml.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <DesignLg color="#fff" />,
            title: t('DigitalGoodsFeatures.cards.createCustomTemplates.title'),
            description: t('DigitalGoodsFeatures.cards.createCustomTemplates.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle={t('DigitalGoodsFeatures.sectionTitle')}
            headingTitle={t('DigitalGoodsFeatures.headingTitle')}
            headingSubtitle={t('DigitalGoodsFeatures.headingSubtitle')}
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

export default DigitalGoodsFeatures