import { Flex, SimpleGrid } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import Plans from './_components/plans/Plans'
import SelectedPlanDetails from './_components/selected-plan-details/SelectedPlanDetails'

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
                <SimpleGrid
                    columns={{ base: 1, md: 2, xl: 4 }}
                    gap={{ lg: 8, md: 6, base: 4 }}
                >
                    <SelectedPlanDetails title='Print on Demand' total={7} used={6} />
                    <SelectedPlanDetails title='NFT' total={15} used={11} />
                    <SelectedPlanDetails title='Royalty Program Integration' total={200} used={80} />
                </SimpleGrid>
            </Flex>
            <Plans showBuyButton />
        </Flex>
    )
}

export default SubscriptionPlans