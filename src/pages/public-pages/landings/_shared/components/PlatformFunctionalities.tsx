import React from 'react'
import SectionContainer from './SectionContainer/SectionContainer'
import { Cards } from './card'
import { CardData } from './card/Cards'
import ModularStackTypography from '../svgs/ModularStackTypography'
import { GridProps } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localEn from 'locales/public-pages/landings/_shared/en.json'
import localAr from 'locales/public-pages/landings/_shared/ar.json'

interface Props {
    cardsData: CardData[],
    templateColumns?: GridProps["templateColumns"]
    hasGradiantOverlay?: boolean
}

export default function PlatformFunctionalities({ cardsData, templateColumns, hasGradiantOverlay }: Props) {
    const { t } = useLocaleResources('public-pages/landings/_shared', { en: localEn, ar: localAr })
    
    const defaultTemplateColumns = {
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(2, 1fr)'
    }

    return (
        <SectionContainer
            icon='layer-web'
            sectionTitle={t('platformFunctionalities.sectionTitle')}
            headingTitle={t('platformFunctionalities.headingTitle')}
            headingSubtitle={t('platformFunctionalities.headingSubtitle')}
            typographySvg={<ModularStackTypography />}
        >
            <Cards
                cardsData={cardsData}
                templateColumns={templateColumns || defaultTemplateColumns}
                hasGradiantOverlay={hasGradiantOverlay}
            />
        </SectionContainer>
    )
}
