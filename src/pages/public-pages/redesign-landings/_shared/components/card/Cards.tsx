import { Grid } from '@chakra-ui/react'
import React from 'react'
import Card from './Card'

export interface CardData {
    icon: React.ReactNode
    title: string
    description: string
    children?: React.ReactNode
    gridColumn?: string | { base?: string; md?: string; lg?: string }
    hasBackgroundOverlay?: boolean
}

interface Props {
    cardsData: CardData[]
    templateColumns?: {
        base?: string
        md?: string
        lg?: string
    }
    hasHoverEffect?: boolean
    gap?: number
}

export default function Cards({ cardsData, templateColumns, gap = 6, hasHoverEffect }: Props) {
    const defaultTemplateColumns = {
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)'
    }

    return (
        <Grid
            width="100%"
            templateColumns={templateColumns || defaultTemplateColumns}
            gap={gap}
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
                />
            ))}
        </Grid>
    )
}