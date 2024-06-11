import { Flex, SimpleGrid } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import useShopPermissionsStore from 'lib/stores/app/shopPermissionsStore'
import React from 'react'
import PlanHeading from '../PlanHeading'
import Container from './_components/Container'
import SelectedPlanDetails from './_components/SelectedPlanDetails'

function SelectedPlan() {
    const { legalUsage, subscriptionId } = useShopPermissionsStore(state => state.shopSubscriptionData)

    return (
        <SimpleGrid
            columns={{ base: 1, md: 2, xl: 4 }}
            gap={4}
        >
            <Container>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <PlanHeading planTitle={subscriptionId.type} />
                    <BasicButton sizes='medium'>renewal Plan</BasicButton>
                </Flex>
                <AppTypography color={"white"}>{subscriptionId.description}</AppTypography>
            </Container>
            {legalUsage.map(data => <SelectedPlanDetails key={data.key} legalUsage={data} />)}
        </SimpleGrid>
    )
}

export default SelectedPlan