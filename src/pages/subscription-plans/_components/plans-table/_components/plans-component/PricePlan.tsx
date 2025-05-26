import { HStack } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import { SubscriptionPlan, IPrice } from "services/subscription/interfaces";
import useSubscriptionPlanPurchaseStore from "stores/subscription-plan.ts/subscriptionPlanStore";
import * as React from 'react';

interface IProps {
    plan: SubscriptionPlan
}

export function PricePlan({ plan }: IProps) {
    const preferredPlanDuration = useSubscriptionPlanPurchaseStore((state) => state.preferredPlanDuration);

    if (plan.type === 'STARTER' || plan.type === 'ENTERPRISE')
        return <AppTypography color="neutral.white" fontWeight={700} fontSize="24px">{plan.price}</AppTypography>


    const targetPrice = (plan.price as IPrice[]).find(price => price.month === preferredPlanDuration?.month);
    if (!targetPrice) return null;

    return preferredPlanDuration.discount ? (
        <HStack>
            <AppTypography color="neutral.white" fontWeight={700} fontSize="24px">${targetPrice.discountPrice}</AppTypography>
            <AppTypography as="span" fontSize={12} fontWeight={400} color="#FF2244" textDecoration="line-through">${targetPrice.price}</AppTypography>
        </HStack>
    ) : (
        <AppTypography color="neutral.white" fontWeight={700} fontSize="24px">${targetPrice.price}</AppTypography>
    );
}
