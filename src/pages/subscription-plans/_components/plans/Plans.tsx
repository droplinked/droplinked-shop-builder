import { SimpleGrid } from "@chakra-ui/react";
import { getSubscriptionPlansService } from "lib/apis/subscription/subscriptionServices";
import React from "react";
import { useQuery } from "react-query";
import Loading from "./_components/loading/Loading";
import PlanCard from "./_components/plan-card/PlanCard";

const Plans = ({ showBuyButton }: { showBuyButton: boolean }) => {
    const { isFetching, data } = useQuery({
        queryKey: ["subscription-plans"],
        queryFn: () => getSubscriptionPlansService(),
        refetchOnWindowFocus: false
    })

    return (
        <SimpleGrid
            columns={{ base: 1, md: 2, xl: 4 }}
            gap={{ lg: 8, md: 6 }}
        >
            {
                isFetching ?
                    <Loading /> :
                    <>
                        {data.data.map(plan => <PlanCard key={plan._id} plan={plan} showBuyButton={showBuyButton} />)}
                    </>
            }

        </SimpleGrid>
    )
}

export default Plans
