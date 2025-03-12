import { Flex, FlexProps } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces'
import React, { useCallback, useEffect, useRef } from 'react'
import useSubscriptionPlanPurchaseStore from '../../../../../../lib/stores/subscription-plan.ts/subscriptionPlanStore'

interface Props extends FlexProps {
    plan: SubscriptionPlan
}

function PlanPrice({ plan, ...props }: Props) {
    const { preferredPlanDuration, planCardStyles, updatePlanCardStyles } = useSubscriptionPlanPurchaseStore(state => ({
        preferredPlanDuration: state.preferredPlanDuration,
        planCardStyles: state.planCardStyles,
        updatePlanCardStyles: state.updatePlanCardStyles
    }))
    const containerRef = useRef<HTMLDivElement>(null)
    const targetPrice = plan.price.find(priceOption => priceOption.month === preferredPlanDuration.month)

    function renderPlanPrice() {
        if (plan.type === 'STARTER') return <AppTypography>Free</AppTypography>
        if (plan.type === 'ENTERPRISE') return <AppTypography>Let’s talk</AppTypography>

        if (preferredPlanDuration.discount) {
            return (
                <>
                    <AppTypography>${targetPrice?.discountPrice}</AppTypography>
                    <AppTypography as="span" fontSize={20} fontWeight={400} color="#FF2244" textDecoration="line-through">
                        ${targetPrice?.price}
                    </AppTypography>
                </>
            )
        }

        return <AppTypography>${targetPrice?.price}</AppTypography>
    }

    const adjustPriceHeight = useCallback(() => {
        if (plan.type !== 'BUSINESS_PRO') return
        const defaultHeight = 48

        if (!preferredPlanDuration.discount) {
            updatePlanCardStyles('priceHeight', defaultHeight)
            return
        }

        if (containerRef.current) {
            const { scrollHeight } = containerRef.current
            updatePlanCardStyles('priceHeight', scrollHeight > defaultHeight ? scrollHeight : defaultHeight)
        }
    }, [plan.type, preferredPlanDuration.discount, updatePlanCardStyles])

    useEffect(() => {
        adjustPriceHeight()
        window.addEventListener('resize', adjustPriceHeight)
        return () => {
            window.removeEventListener('resize', adjustPriceHeight)
        }
    }, [adjustPriceHeight])

    return (
        <Flex
            ref={containerRef}
            height={`${planCardStyles.priceHeight}px`}
            flexWrap="wrap"
            alignItems="baseline"
            rowGap={0}
            columnGap={3}
            sx={{ p: { fontSize: 32, fontWeight: 700, color: 'white' } }}
            {...props}
        >
            {renderPlanPrice()}
        </Flex>
    )
}

export default PlanPrice