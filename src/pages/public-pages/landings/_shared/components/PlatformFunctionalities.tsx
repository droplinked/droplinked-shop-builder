import React from 'react'
import SectionContainer from './SectionContainer/SectionContainer'
import { Cards } from './card'
import { CardData } from './card/Cards'
import ModularStackTypography from '../svgs/ModularStackTypography'
import { GridProps } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    cardsData: CardData[],
    templateColumns?: GridProps["templateColumns"]
    hasGradiantOverlay?: boolean
    isGridCards?: boolean
}

export default function PlatformFunctionalities({ cardsData, templateColumns, hasGradiantOverlay, isGridCards = true }: Props) {
    const { t } = useLocaleResources('common')

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
                isGridCards={isGridCards}
            />
        </SectionContainer>
    )
}
