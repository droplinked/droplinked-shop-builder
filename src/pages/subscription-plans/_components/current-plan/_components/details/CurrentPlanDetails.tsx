import { Flex, SimpleGrid } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { ShopSubscriptionData } from 'lib/apis/subscription/interfaces'
import PlanHeading from 'pages/subscription-plans/_components/PlanHeading'
import React from 'react'
import Container from './Container'
import LegalUsageItem from './LegalUsageItem'

function CurrentPlanDetails({ shopSubscriptionData }: { shopSubscriptionData: ShopSubscriptionData }) {
    const { subscriptionId: { type, description }, legalUsage, expiresAt } = shopSubscriptionData

    return (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={4}>

            {/* current plan's title, description and renewal button */}
            <Container>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <PlanHeading planTitle={type} />
                    {/* {type !== "STARTER" && <BasicButton sizes='medium'>renewal Plan</BasicButton>} */}
                </Flex>

                <AppTypography color={"white"}>{description}</AppTypography>
            </Container>

            {/* current plan's expiration date */}
            <Container>
                <AppTypography fontSize={14} fontWeight={600} color={"white"}>Expiration Date</AppTypography>
                <AppTypography fontSize={14} color={"white"}>
                    Your plan will expire on {(new Date(expiresAt)).toLocaleDateString("en-US", { minute: "numeric", hour: "numeric", day: "numeric", month: "long", year: "numeric" })}
                </AppTypography>
            </Container>

            {/* product types */}
            {legalUsage.map(data => <LegalUsageItem key={data.key} legalUsage={data} />)}

        </SimpleGrid>
    )
}

export default CurrentPlanDetails