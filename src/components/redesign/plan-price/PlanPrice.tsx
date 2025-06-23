import { Flex, FlexProps } from '@chakra-ui/react'
import { SubscriptionPlan, IPrice } from 'lib/apis/subscription/interfaces'
import React, { useMemo } from 'react'
import useSubscriptionPlanPurchaseStore from '../../../stores/subscription-plan.ts/subscriptionPlanStore'
import PriceContent from './PriceContent'

/**
 * PlanPrice Component - Displays subscription plan pricing
 * 
 * Shows plan price with appropriate formatting based on the selected duration,
 * with support for discount visualization and customizable font sizes.
 * 
 * @param {object} props - Component props
 * @param {SubscriptionPlan} props.plan - The subscription plan object with pricing information
 * @param {number} [props.mainFontSize=32] - Font size for the main price amount
 * @param {number} [props.discountFontSize=20] - Font size for the discounted price display
 * @param {boolean} [props.showFree=false] - Override to show "Free" instead of actual price
 * @param {FlexProps} props - Additional Chakra UI flex props
 */
interface Props extends FlexProps {
    plan: SubscriptionPlan
    mainFontSize?: number
    discountFontSize?: number
    showFree?: boolean
}

function PlanPrice({ plan, mainFontSize = 32, discountFontSize = 20, showFree = false, ...props }: Props) {
    const { preferredPlanDuration} = useSubscriptionPlanPurchaseStore(state => ({
        preferredPlanDuration: state.preferredPlanDuration,
    }))

    const targetPrice = useMemo(() => 
        typeof plan.price[0] === 'string' ? null : 
        (plan.price as IPrice[]).find(price => price.month === preferredPlanDuration.month),
        [plan.price, preferredPlanDuration.month]
    )

    const flexProps = useMemo(() => ({
        flexWrap: "wrap" as const,
        alignItems: "baseline" as const,
        rowGap: 0,
        columnGap: 3,

        sx: { p: { fontSize: mainFontSize, fontWeight: 700, color: 'white' } }
    }), [ mainFontSize])

    return (
        <Flex {...flexProps} {...props}>
            <PriceContent
                planType={plan.type}
                targetPrice={targetPrice}
                hasDiscount={preferredPlanDuration.discount}
                mainFontSize={mainFontSize}
                discountFontSize={discountFontSize}
                showFree={showFree}
            />
        </Flex>
    )
}

export default React.memo(PlanPrice)