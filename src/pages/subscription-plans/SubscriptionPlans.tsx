import { Box, Flex } from '@chakra-ui/react'
import PricingPlanBg from "assets/image/pricingPlans/background.png"
import React from 'react'
import PlansTable from './_components/plans-table/PlansTable'
import Plans from './_components/plans/Plans'
import NewCurrentPlan from './_components/redesign-current-plan/CurrentPlan'

function SubscriptionPlans() {
    return (
        <Box position="relative" width="100%">
            <Box zIndex={-1} backgroundImage={`url(${PricingPlanBg})`} backgroundRepeat={"no-repeat"} backgroundSize={"cover"} backgroundPosition={{ md: "center", lg: "center -6rem" }} width={"100%"} height={"654px"} position={"absolute"} />
            <Flex direction={"column"} gap={9} position="relative" zIndex={1}>
                <NewCurrentPlan />
                <Plans />
                <PlansTable />
            </Flex>
        </Box>
    )
}

export default SubscriptionPlans