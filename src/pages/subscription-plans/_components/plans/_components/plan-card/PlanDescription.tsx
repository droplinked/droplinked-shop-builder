import { Text } from '@chakra-ui/react'
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces'
import React, { useCallback, useEffect, useRef } from 'react'
import { subscriptionPlans } from 'utils/constants/subscriptionPlans'
import useSubscriptionPlanPurchaseStore from '../../../../../../lib/stores/subscription-plan.ts/subscriptionPlanStore'

function PlanDescription({ plan }: { plan: SubscriptionPlan }) {
    const descriptionRef = useRef<HTMLDivElement>(null)
    const { descriptionHeight, updatePlanCardStyles } = useSubscriptionPlanPurchaseStore(state => ({
        descriptionHeight: state.planCardStyles.descriptionHeight,
        updatePlanCardStyles: state.updatePlanCardStyles
    }))
    const { description } = subscriptionPlans[plan.type]

    const adjustDescriptionHeight = useCallback(() => {
        if (plan.type !== 'BUSINESS_PRO') return // Because the longest description belongs to the business pro plan

        if (descriptionRef.current) {
            const { scrollHeight } = descriptionRef.current
            if (scrollHeight > 48) {
                updatePlanCardStyles('descriptionHeight', scrollHeight)
            }
        }
    }, [plan.type, updatePlanCardStyles])

    useEffect(() => {
        adjustDescriptionHeight()
        window.addEventListener('resize', adjustDescriptionHeight)
        return () => {
            window.removeEventListener('resize', adjustDescriptionHeight)
        }
    }, [adjustDescriptionHeight])

    return (
        <Text
            ref={descriptionRef}
            height={`${descriptionHeight}px`}
            fontSize={16}
            color="#B1B1B1"
        >
            {description}
        </Text>
    )
}

export default PlanDescription