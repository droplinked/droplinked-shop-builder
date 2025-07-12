import React from 'react'
import SectionContainer from './SectionContainer/SectionContainer'
import { Cards } from './card'
import { CardData } from './card/Cards'
import ModularStackTypography from '../svgs/ModularStackTypography'
import { GridProps } from '@chakra-ui/react'

interface Props {
    cardsData: CardData[],
    templateColumns?: GridProps["templateColumns"]
    hasGradiantOverlay?: boolean
}

export default function PlatformFunctionalities({ cardsData, templateColumns, hasGradiantOverlay }: Props) {
    const defaultTemplateColumns = {
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(2, 1fr)'
    }

    return (
        <SectionContainer
            icon='layer-web'
            sectionTitle='MODULAR STACK'
            headingTitle='Platform Functionalities'
            headingSubtitle='droplinked provides customizable tools and integrations to support any business'
            typographySvg={<ModularStackTypography />}
        >
            <Cards
                cardsData={cardsData}
                templateColumns={templateColumns || defaultTemplateColumns}
                hasGradiantOverlay={hasGradiantOverlay}
                isGridCards
            />
        </SectionContainer>
    )
}
