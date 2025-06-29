import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import localAr from "locales/subscription/ar.json";
import localEn from "locales/subscription/en.json";
import React from "react";
import { useQuery } from "react-query";
import { getSubscriptionPlansService } from "services/subscription/subscriptionServices";
import PlanDurationRadioContainer from "../../../../components/redesign/plan-duration-radio/PlanDurationRadioContainer";
import Loading from "./loading/Loading";
import PlanCard from "./plan-card/PlanCard";

export default function Plans() {
    const { t } = useLocaleResources('subscription', { en: localEn, ar: localAr });
    const { isFetching, isError, data } = useQuery({
        queryKey: ["subscription-plans"],
        queryFn: () => getSubscriptionPlansService()
    })

    if (isFetching) return <PlansGrid><Loading /></PlansGrid>

    if (isError) return <Text color="red.400">{t('errors.subscriptionDataUnavailable')}</Text>

    const plans = data.data

    return (
        <Flex direction="column" gap={9}>
            <PlanDurationRadioContainer defaultDuration="Yearly" />
            <PlansGrid >
                {plans.map((plan) => <PlanCard key={plan._id} plan={plan} />)}
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