import { useBreakpointValue } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { getProductCards } from 'pages/onboarding/constants/productCards'
import React from 'react'
import RightSectionWrapper from '../common/RightSectionWrapper'
import ProductCard from './product-card/ProductCard'
import DesktopCardsContainer from './product-cards-container/DesktopCardsContainer'
import ProductCardsWrapper from './product-cards-container/ProductCardsWrapper'
import TabletCardsContainer from './product-cards-container/TabletCardsContainer'
import XLargeCardsContainer from './product-cards-container/XLargeCardsContainer'

function ProductCards() {
    const shouldRender = useBreakpointValue({ base: false, lg: true })
    const ContainerComponent = useBreakpointValue({
        base: TabletCardsContainer,
        xl: DesktopCardsContainer,
        "3xl": XLargeCardsContainer
    })
    const { isRTL, t } = useLocaleResources('onboarding')

    // Return null for screens smaller than 1024px
    if (!shouldRender) return null

    return (
        <RightSectionWrapper
            paddingTop={{ base: 0, xl: 12, "3xl": "80px" }}
            paddingRight={isRTL ? { base: 0, xl: 12, "3xl": "80px" } : "unset"}
            paddingBottom={0}
            paddingLeft={isRTL ? "unset" : { base: 0, xl: 12, "3xl": "80px" }}
            overflow="hidden"
        >
            <ContainerComponent>
                <ProductCardsWrapper>
                    {getProductCards(t).map((card, index) => (
                        <ProductCard key={card.frontTitle ?? index} card={card} />
                    ))}
                </ProductCardsWrapper>
            </ContainerComponent>
        </RightSectionWrapper>
    )
}

export default ProductCards