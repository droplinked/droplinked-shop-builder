import { Flex, SimpleGrid } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import { getSubscriptionPlansService } from "lib/apis/subscription/subscriptionServices";
import React from "react";
import { useQuery } from "react-query";
import AppErrors from "utils/constants/errors";
import { getFilteredFeatures } from "utils/helpers";
import PlanDurationRadioContainer from "../../../../components/redesign/plan-duration-radio/PlanDurationRadioContainer";
import Loading from "./_components/loading/Loading";
import PlanCard from "./_components/plan-card/PlanCard";


export default function Plans() {
    const { isFetching, isError, data } = useQuery({
        queryKey: ["subscription-plans"],
        queryFn: () => getSubscriptionPlansService()
    })

    if (isFetching) return <PlansGrid><Loading /></PlansGrid >

    if (isError) return <AppTypography fontSize={16} color={"red.400"}>{AppErrors.permission.subscriptionDataUnavailable}</AppTypography>

    const plans = data.data

    return (
        <Flex direction={"column"} gap={9}>
            <PlanDurationRadioContainer />
            <PlansGrid >
                {plans.map((plan, index) => {
                    const prevPlan = plans[index - 1] || plans[0]
                    return (
                        <PlanCard
                            key={plan._id}
                            plan={plan}
                            plans={plans}
                            prevPlanType={prevPlan.type}
                            features={index === 0 ?
                                getFilteredFeatures(plan) :
                                getFilteredFeatures(plan, plans[index - 1])
                            }
                        />
                    )
                })}
            </PlansGrid>
        </Flex>
    )
}

function PlansGrid({ children }) {
    return (
        <SimpleGrid
            columns={{ base: 1, md: 2, lg: 2, xl: 4 }}
            columnGap={{ lg: 6, md: 4, base: 4 }}
            rowGap={{ lg: 6, md: 4, base: 9 }}
        >
            {children}
        </SimpleGrid>
    )
}