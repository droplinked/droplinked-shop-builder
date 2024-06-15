import { Flex, SimpleGrid } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import { ShopSubscriptionData } from 'lib/apis/subscription/interfaces'
import { useGetPermissionValue } from 'lib/stores/app/shopPermissionsStore'
import PlanHeading from 'pages/subscription-plans/_components/PlanHeading'
import React from 'react'
import Container from './Container'
import LegalUsageItem from './LegalUsageItem'

function CurrentPlanDetails({ shopSubscriptionData }: { shopSubscriptionData: ShopSubscriptionData }) {
    const getPermissionValue = useGetPermissionValue()
    const { subscriptionId: { type, description }, legalUsage } = shopSubscriptionData
    const planDetails = [
        { title: "Web3 Login Methods", value: getPermissionValue("web3_network_login") },
        { title: "Web3 Payment Methods", value: getPermissionValue("web3_payment") },
    ]

    return (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={4}>

            {/* current plan's title, description and renewal button */}
            <Container>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <PlanHeading planTitle={type} />
                    {type !== "STARTER" && <BasicButton sizes='medium'>renewal Plan</BasicButton>}
                </Flex>
                <AppTypography color={"white"}>{description}</AppTypography>
            </Container>

            {/* product types */}
            {legalUsage.map(data => <LegalUsageItem key={data.key} legalUsage={data} />)}

            {
                planDetails.map(({ title, value }) => {
                    const methodType = title === "Web3 Login Methods" ? "login" : "payment"
                    return (
                        <Container key={title} >
                            <AppTypography fontSize={14} color={"white"}>
                                {
                                    value === "Unlimited" ?
                                        `You can activate an unlimited number of ${methodType} methods` :
                                        `You can only activate up to ${value} ${methodType} method${+value > 1 ? "s" : ""}`
                                }
                            </AppTypography>
                        </Container>
                    )
                })
            }
        </SimpleGrid>
    )
}

export default CurrentPlanDetails