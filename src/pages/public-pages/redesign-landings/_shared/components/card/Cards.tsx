import { Grid, GridProps, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import Card from './Card'

export interface CardData extends GridProps {
    icon?: React.ReactNode
    title?: string
    description?: string
    hasBackgroundOverlay?: boolean
    innerOverlay?: string
    backgroundImage?: string
    iconBackground?: string
}

interface Props extends GridProps {
    cardsData: CardData[]
    hasHoverEffect?: boolean
    hasGradiantOverlay?: boolean
}

/**
 * Grid container that renders multiple Card components.
 * Manages responsive layout and passes shared props to individual Card instances.
 */
export default function Cards({ cardsData, templateColumns, gap, hasHoverEffect, flexDirection, hasGradiantOverlay }: Props) {
    const responsiveGap = useBreakpointValue({ base: 4, "2xl": 6 })

    const defaultTemplateColumns = {
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)'
    }

    return (
        <Grid
            width="100%"
            templateColumns={templateColumns || defaultTemplateColumns}
            gap={gap || responsiveGap}
        >
            {cardsData.map((card, index) => (
                <Card
                    key={index}
                    icon={card.icon}
                    title={card.title}
                    description={card.description}
                    children={card.children}
                    gridColumn={card.gridColumn}
                    hasHoverEffect={hasHoverEffect}
                    hasBackgroundOverlay={card.hasBackgroundOverlay}
                    flexDirection={flexDirection}
                    hasGradiantOverlay={hasGradiantOverlay}
                    innerOverlay={card.innerOverlay}
                    backgroundImage={card.backgroundImage}
                    iconBackground={card.iconBackground}
                />
            ))}
        </Grid>
    )
}