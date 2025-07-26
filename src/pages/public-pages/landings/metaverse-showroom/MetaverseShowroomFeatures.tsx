import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { MetaverseLg } from 'assets/icons/System/Metaverse/MetaverseLg'
import { CartLg } from 'assets/icons/System/Cart/CartLg'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

function MetaverseShowroomFeatures() {
    const { t } = useLocaleResources('public-pages/landings/metaverse-showroom')

    const cardsData: CardData[] = [
        {
            icon: <MetaverseLg color="#fff" />,
            title: t('MetaverseShowroomFeatures.cards.immersiveExperiences.title'),
            description: t('MetaverseShowroomFeatures.cards.immersiveExperiences.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <DesignLg color="#fff" />,
            title: t('MetaverseShowroomFeatures.cards.customizableMarketplace.title'),
            description: t('MetaverseShowroomFeatures.cards.customizableMarketplace.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <CartLg color="#fff" />,
            title: t('MetaverseShowroomFeatures.cards.seamlesslyInteractive.title'),
            description: t('MetaverseShowroomFeatures.cards.seamlesslyInteractive.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle={t('MetaverseShowroomFeatures.sectionTitle')}
            headingTitle={t('MetaverseShowroomFeatures.headingTitle')}
            headingSubtitle={t('MetaverseShowroomFeatures.headingSubtitle')}
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