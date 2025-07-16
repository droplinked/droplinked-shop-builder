import { CodeLg } from 'assets/icons/Coding/Code/CodeLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { Layout2Lg } from 'assets/icons/StyleDesigner/Layout2/Layout2Lg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'

function PhysicalInventoryFeatures() {
    const { t } = useLocaleResources('public-pages/landings/physical-inventory')

    const cardsData: CardData[] = [
        {
            icon: <Layout2Lg color="#fff" />,
            title: t('PhysicalInventoryFeatures.cards.templateEngineTools.title'),
            description: t('PhysicalInventoryFeatures.cards.templateEngineTools.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <CodeLg color="#fff" />,
            title: t('PhysicalInventoryFeatures.cards.customizationWithCssHtml.title'),
            description: t('PhysicalInventoryFeatures.cards.customizationWithCssHtml.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <DesignLg color="#fff" />,
            title: t('PhysicalInventoryFeatures.cards.createCustomTemplates.title'),
            description: t('PhysicalInventoryFeatures.cards.createCustomTemplates.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle={t('PhysicalInventoryFeatures.sectionTitle')}
            headingTitle={t('PhysicalInventoryFeatures.headingTitle')}
            headingSubtitle={t('PhysicalInventoryFeatures.headingSubtitle')}
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

export default PhysicalInventoryFeatures