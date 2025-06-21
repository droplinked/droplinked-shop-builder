import { Grid } from '@chakra-ui/react'
import React from 'react'
import Card from './Card'

export interface CardData {
    icon: React.ReactNode;
    title: string;
    description: string;
    animation?: React.ReactNode;
    gridColumn?: string | { base?: string; md?: string; lg?: string };
}

interface Props {
    cardsData: CardData[];
    templateColumns?: {
        base?: string;
        md?: string;
        lg?: string;
    };
    gap?: number;
}

export default function Cards({ cardsData, templateColumns, gap = 6 }: Props) {
    const defaultTemplateColumns = {
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)'
    };

    return (
        <Grid
            templateColumns={templateColumns || defaultTemplateColumns}
            gap={gap}
        >
            {cardsData.map((card, index) => (
                <Card
                    key={index}
                    icon={card.icon}
                    title={card.title}
                    description={card.description}
                    animation={card.animation}
                    gridColumn={card.gridColumn}
                />
            ))}
        </Grid>
    )
}