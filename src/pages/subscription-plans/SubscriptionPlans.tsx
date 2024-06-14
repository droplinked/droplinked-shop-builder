import { Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import Plans from './_components/plans/Plans'
import CurrentPlan from './_components/current-plan/CurrentPlan'

function SubscriptionPlans() {
    return (
        <Flex direction={"column"} gap={"80px"}>
            <Flex
                direction={"column"}
                gap={6}
                borderRadius={8}
                padding={"24px 36px"}
                bgColor={"#262626"}
            >
                <AppTypography fontSize={16} fontWeight={600} color={"white"}>Current subscription plan</AppTypography>
                <CurrentPlan />
            </Flex>
            <Plans showBuyButton />
        </Flex>
    )
}

export default SubscriptionPlans