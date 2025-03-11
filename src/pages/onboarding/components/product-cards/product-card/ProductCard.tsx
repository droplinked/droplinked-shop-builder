import { Box } from '@chakra-ui/react'
import { ProductCardData } from 'pages/onboarding/types/onboarding'
import React, { useState } from 'react'
import CardBack from './CardBack'
import CardFront from './CardFront'

export default function ProductCard({ card }: { card: ProductCardData }) {
    const [isFlipped, setIsFlipped] = useState(false)
    const { iconType, frontTitle, frontDescription, frontBackgroundImage, backBackgroundImage } = card

    return (
        <Box
            as="article"
            width={{ lg: "240px", xl: "312px", "2xl": "342px" }}
            aspectRatio={1}
            sx={{ position: 'relative', perspective: '1000px' }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <Box
                as="section"
                width="100%"
                height="100%"
                sx={{
                    position: 'absolute',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
            >
                <CardFront
                    iconType={iconType}
                    frontTitle={frontTitle}
                    frontDescription={frontDescription}
                    frontBackgroundImage={frontBackgroundImage}
                />
                <CardBack backBackgroundImage={backBackgroundImage} />
            </Box>
        </Box>
    )
}