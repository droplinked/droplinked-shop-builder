import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { MetaverseLg } from 'assets/icons/System/Metaverse/MetaverseLg'
import { CartLg } from 'assets/icons/System/Cart/CartLg'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

// Import locale files
import localEn from 'locales/public-pages/landings/metaverse-showroom/en.json'
import localAr from 'locales/public-pages/landings/metaverse-showroom/ar.json'

function MetaverseShowroomFeatures() {
    const { t } = useLocaleResources('public-pages/landings/metaverse-showroom', { en: localEn, ar: localAr })

    const cardsData: CardData[] = [
        {
            icon: <MetaverseLg color="#fff" />,
            title: t('features.cards.immersiveExperiences.title'),
            description: t('features.cards.immersiveExperiences.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <DesignLg color="#fff" />,
            title: t('features.cards.customizableMarketplace.title'),
            description: t('features.cards.customizableMarketplace.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <CartLg color="#fff" />,
            title: t('features.cards.seamlesslyInteractive.title'),
            description: t('features.cards.seamlesslyInteractive.description'),
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

export default MetaverseShowroomFeatures