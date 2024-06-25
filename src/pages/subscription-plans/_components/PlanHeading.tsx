import { Flex } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import React, { JSX } from 'react';

interface Props {
    planTitle: string,
    fontSize?: number;
    iconSize?: number;
}

export const subscriptionPlanMap: Record<string, { icon: JSX.Element, title: string }> = {
    "STARTER": { icon: <AppIcons.Starter />, title: "Starter" },
    "BASIC": { icon: <AppIcons.Starter />, title: "Basic" },
    "BUSINESS": { icon: <AppIcons.Business />, title: "Business" },
    "BUSINESS_PRO": { icon: <AppIcons.Premium />, title: "Business Pro" },
    "ENTERPRISE": { icon: <AppIcons.Enterprise />, title: "Enterprise" }
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