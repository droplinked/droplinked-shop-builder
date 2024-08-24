import AppTypography from 'components/common/typography/AppTypography'
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces'
import React from 'react'
import useSubscriptionPlanPurchaseStore from '../../store/planPurchaseStore'

function PlanPrice({ plan, marginTop = 0 }: { plan: SubscriptionPlan, marginTop?: number }) {
    const preferredPlanDuration = useSubscriptionPlanPurchaseStore((state) => state.preferredPlanDuration)

    const renderPlanPrice = () => {
        const { type } = plan
        if (type === "STARTER") return "Free"
        if (type === "ENTERPRISE") return "Let’s talk"

        const targetPriceObj = plan.price.find((priceOption) => priceOption.month === preferredPlanDuration.month)
        if (preferredPlanDuration.discount) {
            return (
                <>
                    ${targetPriceObj.discountPrice}
                    <AppTypography as="span" ml={3} fontSize={20} fontWeight={400} color="#FF2244" textDecoration="line-through">
                        ${targetPriceObj.price}
                    </AppTypography>
                </>
            )
        }
        return `$${targetPriceObj.price}`
    }

    return (
        <AppTypography marginTop={marginTop} fontSize={32} fontWeight={700} color="white">{renderPlanPrice()}</AppTypography>
    )
}

export default PlanPrice