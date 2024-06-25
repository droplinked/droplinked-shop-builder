import { SimpleGrid } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import { SubOptionId, SubscriptionPlan } from "lib/apis/subscription/interfaces";
import { getSubscriptionPlansService } from "lib/apis/subscription/subscriptionServices";
import AppErrors from "lib/utils/statics/errors/errors";
import React from "react";
import { useQuery } from "react-query";
import Loading from "./_components/loading/Loading";
import PlanCard from "./_components/plan-card/PlanCard";

const Plans = () => {
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

    return (
        <SimpleGrid
            columns={{ base: 1, md: 2, xl: 4 }}
            gap={{ lg: 8, md: 6, base: 4 }}
        >
            {plans.map((plan, index) => {
                const prevPlan = plans[index - 1] || plans[0]
                return <PlanCard
                    key={plan._id}
                    plan={plan}
                    prevPlanType={prevPlan.type}
                    features={index === 0 ?
                        getFilteredFeatures(plan) :
                        getFilteredFeatures(plan, plans[index - 1])
                    }
                />
            })}
        </SimpleGrid>
    )
}

export default Plans