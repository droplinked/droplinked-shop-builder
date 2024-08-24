import { Flex } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import React, { JSX } from 'react';

interface Props {
    planTitle: string,
    fontSize?: number;
    iconSize?: number;
}

export const subscriptionPlanMap: Record<string, { icon: JSX.Element, title: string, description: string }> = {
    "STARTER": { icon: <AppIcons.StarterPlan />, title: "Starter", description: "For individuals or companies just getting started." },
    "BUSINESS": { icon: <AppIcons.ProPlan />, title: "Pro", description: "For small businesses and teams ready to grow." },
    "BUSINESS_PRO": { icon: <AppIcons.PremiumPlan />, title: "Premium", description: "Designed for large businesses needing comprehensive solutions at scale." },
    "ENTERPRISE": { icon: <AppIcons.EnterprisePlan />, title: "Enterprise", description: "Contact us to explore integration." }
}

function PlanHeading({ planTitle, fontSize = 16, iconSize = 16 }: Props) {
    const { icon, title } = subscriptionPlanMap[planTitle]

    return (
        <Flex
            alignItems={"center"}
            gap={2}
            sx={{
                svg: { width: `${iconSize}px`, height: `${iconSize}px` }
            }}
        >
            {icon}
            <AppTypography fontSize={fontSize} fontWeight={700} color={"white"}>{title}</AppTypography>
        </Flex>
    )
}

export default PlanHeading