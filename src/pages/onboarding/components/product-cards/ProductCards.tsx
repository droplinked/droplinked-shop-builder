import { Grid, useBreakpointValue } from '@chakra-ui/react'
import { PRODUCT_CARDS } from 'pages/onboarding/constants/productCards'
import React from 'react'
import ProductCard from './product-card/ProductCard'
import ProductCardsContainer from './product-cards-container/ProductCardsContainer'

function ProductCards() {
    const shouldRender = useBreakpointValue({
        base: false,  // Below 1024px
        lg: true      // 1024px and above
    })

    // Return null for screens smaller than 1024px
    if (!shouldRender) return null

    return (
        <ProductCardsContainer>
            <Grid
                as="section"
                justifyContent={{ base: "center", xl: "start" }}
                templateColumns={{ base: "repeat(1, auto)", xl: "repeat(2, auto)" }}
                gap={{ base: 4, "2xl": 6 }}
                role="region"
                aria-label="Product Types"
            >
                {PRODUCT_CARDS.map((card) => (
                    <ProductCard key={card.frontTitle} card={card} />
                ))}
            </Grid>
        </ProductCardsContainer>
    )
}

export default ProductCards