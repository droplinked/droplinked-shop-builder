import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function PopularPlanBadge() {
    return (
        <Flex
            position={"absolute"}
            top={0}
            left="50%"
            transform="translate(-50%, -50%)"
            alignItems={"center"}
            gap={2}
            paddingBlock={2}
            paddingInline={4}
            borderRadius={"200px"}
            bgColor={"#2BCFA1"}
            whiteSpace={"nowrap"}
        >
            <AppIcons.PopularPlanMedal />
            <AppTypography textTransform={"uppercase"} fontSize={14} fontWeight={600} color={"#000"}>most popular</AppTypography>
        </Flex>
    )
}

export default PopularPlanBadge