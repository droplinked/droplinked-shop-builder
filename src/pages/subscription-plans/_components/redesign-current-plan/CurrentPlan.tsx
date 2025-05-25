import { HStack, VStack } from '@chakra-ui/react';
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import useShopSubscriptionData from 'hooks/shop-subscription-data/useShopSubscriptionData';
import * as React from 'react';
import { getSubscriptionPlanIcon } from 'utils/helpers';
import PlanBadge from './_components/PlanBadge';
import PlanDescription from './_components/PlanDescription';
import StatisticModal from './_components/statistics/StatisticModal';

function NewCurrentPlan() {
    const { isFetching, data } = useShopSubscriptionData();
    const { type } = data.data.subscriptionId;
    const currentSubData = getSubscriptionPlanIcon(type);

    if (isFetching) {
        return <AppSkeleton borderRadius={"8px"} isLoaded={!isFetching} width={"100%"} height={"6rem"} />
    }

    return (
        <VStack
            backgroundColor={"neutral.gray.1000"}
            borderRadius={"8px"}
            padding={"36px"}
            justifyItems={"start"}
            alignItems={"start"}
        >
            <HStack flexWrap={"wrap"} justifyContent={"space-between"} width={"100%"}>
                <PlanBadge currentSubData={currentSubData} data={data} />
                <StatisticModal data={data} />
            </HStack>
            <PlanDescription data={data} currentSubData={currentSubData} />
        </VStack>
    );
}

export default NewCurrentPlan;