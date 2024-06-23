import { SimpleGrid } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
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
        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={{ lg: 8, md: 6 }}>
            <Loading />
        </SimpleGrid>
    )

    if (isError) return <AppTypography fontSize={16} color={"red.400"}>{AppErrors.permission.shop_subscription_data_unavailable}</AppTypography>

    return (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={{ lg: 8, md: 6 }}>
            {data.data.map(plan => <PlanCard key={plan._id} plan={plan} showBuyButton={showBuyButton} />)}
        </SimpleGrid>
    )
}

export default Plans
