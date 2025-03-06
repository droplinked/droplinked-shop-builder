import { SimpleGrid } from '@chakra-ui/react'
import { PRODUCT_CARDS } from 'pages/onboarding/constants/productCards'
import React from 'react'
import ProductCard from './ProductCard'

function ProductCards() {
    return (
        <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={6}
            width="full"
            maxW="container.md"
            mx="auto"
            role="region"
            aria-label="Product Types"
        >
            {PRODUCT_CARDS.map((card) => (
                <ProductCard key={card.frontTitle} card={card} />
            ))}
        </SimpleGrid>
    )
}

export default ProductCards