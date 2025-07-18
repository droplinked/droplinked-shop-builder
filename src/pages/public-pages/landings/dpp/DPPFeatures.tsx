import { ChartLg } from 'assets/icons/Finance/Chart/ChartLg'
import { Layer1Lg } from 'assets/icons/System/Layer1/Layer1Lg'
import { ShieldLg } from 'assets/icons/System/Shield/ShieldLg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'

export default function DPPFeatures() {
    const { t } = useLocaleResources('public-pages/landings/dpp')

    const cardsData: CardData[] = [
        {
            icon: <ChartLg color="#fff" />,
            title: t('DPPFeatures.cards.traceability.title'),
            description: t('DPPFeatures.cards.traceability.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <Layer1Lg color="#fff" />,
            title: t('DPPFeatures.cards.modularTransparency.title'),
            description: t('DPPFeatures.cards.modularTransparency.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <ShieldLg color="#fff" />,
            title: t('DPPFeatures.cards.security.title'),
            description: t('DPPFeatures.cards.security.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle={t('DPPFeatures.sectionTitle')}
            headingTitle={t('DPPFeatures.headingTitle')}
            headingSubtitle={t('DPPFeatures.headingSubtitle')}
            typographySvg={<Features />}
        >
            <Cards
                cardsData={cardsData}
                hasHoverEffect={true}
                templateColumns={{
                    base: '1fr',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(3, 1fr)'
                }}
            />
        </SectionContainer>
    )
}
