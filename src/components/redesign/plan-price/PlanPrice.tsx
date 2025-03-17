import { Flex, FlexProps } from '@chakra-ui/react'
import { SubscriptionPlan, IPrice } from 'lib/apis/subscription/interfaces'
import React, { useMemo } from 'react'
import useSubscriptionPlanPurchaseStore from '../../../lib/stores/subscription-plan.ts/subscriptionPlanStore'
import PriceContent from './PriceContent'

interface Props extends FlexProps {
    plan: SubscriptionPlan
    mainFontSize?: number
    discountFontSize?: number
}

function PlanPrice({ plan, mainFontSize = 32, discountFontSize = 20, ...props }: Props) {
    const { preferredPlanDuration, planCardStyles } = useSubscriptionPlanPurchaseStore(state => ({
        preferredPlanDuration: state.preferredPlanDuration,
        planCardStyles: state.planCardStyles,
    }))

    const targetPrice = useMemo(() => 
        typeof plan.price[0] === 'string' ? null : 
        (plan.price as IPrice[]).find(price => price.month === preferredPlanDuration.month),
        [plan.price, preferredPlanDuration.month]
    )

    const flexProps = useMemo(() => ({
        height: `${planCardStyles.priceHeight}px`,
        flexWrap: "wrap" as const,
        alignItems: "baseline" as const,
        rowGap: 0,
        columnGap: 3,
        sx: { p: { fontSize: mainFontSize, fontWeight: 700, color: 'white' } }
    }), [planCardStyles.priceHeight, mainFontSize])

    return (
        <Flex {...flexProps} {...props}>
            <PriceContent
                planType={plan.type}
                targetPrice={targetPrice}
                hasDiscount={preferredPlanDuration.discount}
                mainFontSize={mainFontSize}
                discountFontSize={discountFontSize}
            />
        </Flex>
    )
}

export default React.memo(PlanPrice)