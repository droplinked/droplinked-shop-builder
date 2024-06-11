import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function PlanHeading({ planTitle }: { planTitle: string }) {
    const planMap = {
        "STARTER": { icon: <AppIcons.Starter />, title: "Starter" },
        "BASIC": { icon: <AppIcons.Starter />, title: "Basic" },
        "BUSINESS": { icon: <AppIcons.Business />, title: "Business" },
        "BUSINESS_PRO": { icon: <AppIcons.Premium />, title: "Business Pro" },
        "ENTERPRISE": { icon: <AppIcons.Enterprise />, title: "Enterprise" }
    }
    const { icon, title } = planMap[planTitle]

    return (
        <Flex alignItems={"center"} gap={2}>
            {icon}
            <AppTypography fontSize={16} fontWeight={700} color={"white"}>{title}</AppTypography>
        </Flex>
    )
}

export default PlanHeading