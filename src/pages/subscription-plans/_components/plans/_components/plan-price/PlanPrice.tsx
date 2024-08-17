import AppTypography from 'components/common/typography/AppTypography'
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces'
import React from 'react'
import useSubscriptionPlanPurchaseStore, { calculatePlanPrice } from '../../store/planPurchaseStore'

function PlanPrice({ plan, marginTop = 0 }: { plan: SubscriptionPlan, marginTop?: number }) {
    const preferredPlanDuration = useSubscriptionPlanPurchaseStore((state) => state.preferredPlanDuration)

    const renderPlanPrice = () => {
        const { type, price } = plan
        if (type === "STARTER") return "Free"
        if (type === "ENTERPRISE") return "Let’s talk"
        if (preferredPlanDuration === "yearly") {
            const discountedPrice = calculatePlanPrice(plan, preferredPlanDuration)
            return (
                <>
                    ${discountedPrice}
                    <AppTypography as="span" ml={3} fontSize={20} fontWeight={400} color="#FF2244" textDecoration="line-through">
                        ${price}
                    </AppTypography>
                </>
            )
        }
        return `$${price}`
    }

    return (
        <AppTypography marginTop={marginTop} fontSize={32} fontWeight={700} color="white">{renderPlanPrice()}</AppTypography>
    )
}

export default PlanPrice