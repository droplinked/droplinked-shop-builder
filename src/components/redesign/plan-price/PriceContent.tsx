import React from 'react'
import AppTypography from 'components/common/typography/AppTypography'
import { IPrice } from 'lib/apis/subscription/interfaces'

interface PriceContentProps {
    planType: string
    targetPrice: IPrice | null
    hasDiscount: number | undefined
    mainFontSize: number
    discountFontSize: number
}

function PriceContent({ planType, targetPrice, hasDiscount, mainFontSize, discountFontSize }: PriceContentProps) {
    if (planType === 'STARTER') return <AppTypography fontSize={mainFontSize}>Free</AppTypography>
    if (planType === 'ENTERPRISE') return <AppTypography fontSize={mainFontSize}>Let's talk</AppTypography>
    if (!targetPrice) return null

    const { price, discountPrice } = targetPrice
    if (hasDiscount && discountPrice) {
        return (
            <>
                <AppTypography fontSize={mainFontSize}>${discountPrice}</AppTypography>
                <AppTypography as="span" fontSize={discountFontSize} fontWeight={400} color="#FF2244" textDecoration="line-through">
                    ${price}
                </AppTypography>
            </>
        )
    }

    return <AppTypography fontSize={mainFontSize}>${price}</AppTypography>
}

export default PriceContent 