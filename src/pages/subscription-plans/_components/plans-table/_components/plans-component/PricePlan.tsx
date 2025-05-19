import { HStack } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import { SubscriptionPlan } from "lib/apis/subscription/interfaces";
import useSubscriptionPlanPurchaseStore from "stores/subscription-plan.ts/subscriptionPlanStore";
import * as React from 'react';

interface IProps {
    plan: SubscriptionPlan
}

export function PricePlan({ plan }: IProps) {
    const preferredPlanDuration = useSubscriptionPlanPurchaseStore((state) => state.preferredPlanDuration);
    const targetPrice = plan.price.find(priceOption => priceOption?.month === preferredPlanDuration?.month)

    if (plan.type === 'STARTER') return <AppTypography color={"neutral.white"} fontWeight={700} fontSize={"24px"}>Free</AppTypography>
    if (plan.type === 'ENTERPRISE') return <AppTypography color={"neutral.white"} fontWeight={700} fontSize={"24px"}>Let’s talk</AppTypography>

    if (preferredPlanDuration.discount) {
        return (
            <HStack>
                <AppTypography color={"neutral.white"} fontWeight={700} fontSize={"24px"}>${targetPrice?.discountPrice}</AppTypography>
                <AppTypography as="span" fontSize={12} fontWeight={400} color="#FF2244" textDecoration="line-through">
                    ${targetPrice?.price}
                </AppTypography>
            </HStack>
        )
    }

    return <AppTypography color={"neutral.white"} fontWeight={700} fontSize={"24px"}>${targetPrice?.price}</AppTypography>
}
