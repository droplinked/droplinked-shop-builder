import { Text } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localAr from 'locales/subscription/ar.json'
import localEn from 'locales/subscription/en.json'
import React, { useCallback, useEffect, useRef } from 'react'
import { SubscriptionPlan } from 'services/subscription/interfaces'
import useSubscriptionPlanPurchaseStore from 'stores/subscription-plan.ts/subscriptionPlanStore'
import { getSubscriptionPlans } from 'utils/constants/subscriptionPlans'

function PlanDescription({ plan }: { plan: SubscriptionPlan }) {
    const descriptionRef = useRef<HTMLDivElement>(null)
    const { descriptionHeight, updatePlanCardStyles } = useSubscriptionPlanPurchaseStore(state => ({
        descriptionHeight: state.planCardStyles.descriptionHeight,
        updatePlanCardStyles: state.updatePlanCardStyles
    }))
    const { t } = useLocaleResources('subscription', { en: localEn, ar: localAr })
    
    const { description } = getSubscriptionPlans(t)[plan.type]


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
            {t(description)}
        </Text>
    )
}

export default PlanDescription