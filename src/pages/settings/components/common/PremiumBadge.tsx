import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

export default function PremiumBadge() {
    return (
        <Flex background={"#2BCFA11A"} alignItems={"center"} gap={"6px"} justifyContent={"space-between"} borderRadius={"8px"} px={2} py={1}>
            <AppIcons.PremiumPlan style={{ stroke: "#2BCFA1", width: "16px", height: "16px" }} />
            <AppTypography fontSize={"14px"} color={"#2bcfa1"}>
                Premium
            </AppTypography>
        </Flex>
    )
}
