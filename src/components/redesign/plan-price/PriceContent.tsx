import React from 'react'
import AppTypography from 'components/common/typography/AppTypography'
import { IPrice } from 'lib/apis/subscription/interfaces'

/**
 * PriceContent Component - Renders subscription price details
 * 
 * Displays different price formats based on plan type (Free, Enterprise, paid)
 * with support for showing discounted prices with strike-through styling.
 * 
 * @param {object} props - Component props
 * @param {string} props.planType - Type of plan (STARTER, ENTERPRISE, etc.)
 * @param {IPrice|null} props.targetPrice - Price object with pricing information
 * @param {number|undefined} props.hasDiscount - Discount percentage if applicable
 * @param {number} props.mainFontSize - Font size for the main price display
 * @param {number} props.discountFontSize - Font size for the crossed-out original price
 * @param {boolean} [props.showFree=false] - Override to show "Free" instead of actual price
 */
interface PriceContentProps {
    planType: string
    targetPrice: IPrice | null
    hasDiscount: number | undefined
    mainFontSize: number
    discountFontSize: number
    showFree?: boolean
}

function PriceContent({ planType, targetPrice, hasDiscount, mainFontSize, discountFontSize, showFree = false }: PriceContentProps) {
    if (planType === 'STARTER') return <AppTypography fontSize={mainFontSize}>Free</AppTypography>
    if (planType === 'ENTERPRISE') return <AppTypography fontSize={mainFontSize}>Let's talk</AppTypography>
    if (!targetPrice) return null

    const { price, discountPrice } = targetPrice
    const priceDisplay = showFree ? 'Free' : `$${discountPrice}`

    if (hasDiscount && discountPrice) {
        return (
            <>
                <AppTypography fontSize={mainFontSize}>{priceDisplay}</AppTypography>
                <AppTypography as="span" fontSize={discountFontSize} fontWeight={400} color="text.error" textDecoration="line-through">
                    ${price}
                </AppTypography>
            </>
        )
    }

    return <AppTypography fontSize={mainFontSize}>${price}</AppTypography>
}

export default PriceContent