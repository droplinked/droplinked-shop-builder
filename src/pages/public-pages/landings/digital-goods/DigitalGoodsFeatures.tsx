import { CodeLg } from 'assets/icons/Coding/Code/CodeLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { Layout2Lg } from 'assets/icons/StyleDesigner/Layout2/Layout2Lg'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

// Import locale files
import localEn from 'locales/public-pages/landings/digital-goods/en.json'
import localAr from 'locales/public-pages/landings/digital-goods/ar.json'

function DigitalGoodsFeatures() {
    const { t } = useLocaleResources('public-pages/landings/digital-goods', { en: localEn, ar: localAr })

    const cardsData: CardData[] = [
        {
            icon: <Layout2Lg color="#fff" />,
            title: t('features.cards.templateEngineTools.title'),
            description: t('features.cards.templateEngineTools.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <CodeLg color="#fff" />,
            title: t('features.cards.customizationWithCSS.title'),
            description: t('features.cards.customizationWithCSS.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <DesignLg color="#fff" />,
            title: t('features.cards.createCustomTemplates.title'),
            description: t('features.cards.createCustomTemplates.description'),
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

export default DigitalGoodsFeatures