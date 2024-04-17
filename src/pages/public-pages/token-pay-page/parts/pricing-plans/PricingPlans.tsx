import { Flex, Grid } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import PlanAdvantage from './parts/plan-advantage/PlanAdvantage'
import Plan from './parts/plan/Plan'

function PricingPlans() {
    return (
        <Grid
            templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(2, 1fr)" }}
            templateRows={"repeat(1, 1fr)"}
            gap={12}
        >
            <Plan
                icon={<AppIcons.ThreeStars />}
                title='Basic (Token Integration)'
                description='Launch your token-powered shop with ease and unlock a new dimension of commerce.'
                price='$5,000'
            >
                <Flex direction={"column"} gap={"14px"}>
                    <PlanAdvantage title='Token Integration' description='Seamlessly integrate your token for exclusive use in your shop' />
                    <PlanAdvantage title='Shop Builder' description='Access a user-friendly shop builder to create and customize your shop' />
                    <PlanAdvantage title='Analytics Dashboard' description='Gain insights into your sales, customer behavior, and token usage' />
                    <PlanAdvantage title='Shop Designer Pro' isComingSoon />
                </Flex>
            </Plan>

            <Plan
                icon={<AppIcons.Diamond />}
                title='Premium (Token Expansion)'
                description="Elevate your token's utility across our entire marketplace for universal acceptance."
                price='$10,000'
            >
                <Flex direction={"column"} gap={"14px"}>
                    <PlanAdvantage title='Universal Token Use' description="Extend your token's reach, allowing it to be used as payment in all shops" />
                    <PlanAdvantage title='Enhanced Visibility' description='Increased exposure and attracting more to your token and shop.' />
                    <PlanAdvantage title='All Basic Features' description='Everything from the Basic Plan, such as shop and analytics dashboard' />
                </Flex>
            </Plan>
        </Grid>
    )
}

export default PricingPlans