import { useBreakpointValue } from '@chakra-ui/react'
import { PRODUCT_CARDS } from 'pages/onboarding/constants/productCards'
import React from 'react'
import ProductCard from './product-card/ProductCard'
import ProductCardsContainer from './product-cards-container/ProductCardsContainer'
import ProductCardsWrapper from './product-cards-container/ProductCardsWrapper'

function ProductCards() {
    const shouldRender = useBreakpointValue({
        base: false,  // Below 1024px
        lg: true      // 1024px and above
    })

    // Return null for screens smaller than 1024px
    if (!shouldRender) return null

    return (
        <ProductCardsContainer wrapperProps={{ overflow: "hidden" }}>
            <ProductCardsWrapper>
                {PRODUCT_CARDS.map((card, index) => (
                    <ProductCard key={card.frontTitle || index} card={card} />
                ))}
            </ProductCardsWrapper>
        </ProductCardsContainer>
    )
}

export default ProductCards