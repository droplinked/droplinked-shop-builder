import { SimpleGrid } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import { SubOptionId, SubscriptionPlan } from "lib/apis/subscription/interfaces";
import { getSubscriptionPlansService } from "lib/apis/subscription/subscriptionServices";
import AppErrors from "lib/utils/statics/errors/errors";
import React from "react";
import { useQuery } from "react-query";
import Loading from "./_components/loading/Loading";
import PlanCard from "./_components/plan-card/PlanCard";

const Plans = ({ showBuyButton }: { showBuyButton: boolean }) => {
    const { isFetching, isError, data } = useQuery({
        queryKey: ["subscription-plans"],
        queryFn: () => getSubscriptionPlansService(),
        refetchOnWindowFocus: false
    })

    if (isFetching) return (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={{ lg: 8, md: 6, base: 4 }}>
            <Loading />
        </SimpleGrid>
    )

    if (isError) return <AppTypography fontSize={16} color={"red.400"}>{AppErrors.permission.shop_subscription_data_unavailable}</AppTypography>

    const getFilteredFeatures = (currentPlan: SubscriptionPlan, previousPlan?: SubscriptionPlan): SubOptionId[] => {
        if (!previousPlan) return currentPlan.subOptionIds // Return all features for the starter plan

        return currentPlan.subOptionIds.map(subOption => {
            // Find the corresponding subOption in the previous plan
            const previousSubOption = previousPlan?.subOptionIds.find(p => p.key === subOption.key)

            // Filter the features based on the condition
            const filteredFeatures = subOption.value.filter(feature => {
                // If the feature exists in the current plan but not in the previous plan, or its value is different, include it
                const previousFeature = previousSubOption?.value.find(pf => pf.key === feature.key)
                return !previousFeature || feature.value !== previousFeature.value
            })

            return {
                ...subOption,
                value: filteredFeatures
            }
        })
    }

    const plans = data.data
    const starterPlan = plans.find(plan => plan.type === 'STARTER')
    const basicPlan = plans.find(plan => plan.type === 'BASIC')
    const businessPlan = plans.find(plan => plan.type === 'BUSINESS')
    const businessProPlan = plans.find(plan => plan.type === 'BUSINESS_PRO')
    const enterprisePlan = plans.find(plan => plan.type === 'ENTERPRISE')

    return (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={{ lg: 8, md: 6, base: 4 }}>
            <PlanCard plan={starterPlan} showBuyButton={showBuyButton} features={getFilteredFeatures(starterPlan)} />
            <PlanCard plan={basicPlan} showBuyButton={showBuyButton} features={getFilteredFeatures(basicPlan, starterPlan)} />
            <PlanCard plan={businessPlan} showBuyButton={showBuyButton} features={(getFilteredFeatures(businessPlan, basicPlan))} />
            <PlanCard plan={businessProPlan} showBuyButton={showBuyButton} features={getFilteredFeatures(businessProPlan, businessPlan)} />
            <PlanCard plan={enterprisePlan} showBuyButton={showBuyButton} features={getFilteredFeatures(enterprisePlan, businessProPlan)} />
        </SimpleGrid>
    )
}

export default Plans