import { HStack, VStack } from '@chakra-ui/react';
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import useShopSubscriptionData from 'hooks/shop-subscription-data/useShopSubscriptionData';
import * as React from 'react';
import { getSubscriptionPlanIcon } from 'utils/helpers';
import PlanBadge from './components/PlanBadge';
import PlanDescription from './components/PlanDescription';
import StatisticModal from './components/statistics/StatisticModal';

function CurrentPlan() {
    const { isFetching, data } = useShopSubscriptionData();
    const subscriptionData = data?.data;
    const planType = subscriptionData?.subscriptionId?.type;
    const currentPlanInformation = getSubscriptionPlanIcon(planType);

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
                <PlanBadge currentSubData={currentPlanInformation} data={subscriptionData} />
                <StatisticModal data={subscriptionData} />
            </HStack>
            <PlanDescription data={subscriptionData} currentSubData={currentPlanInformation} />
        </VStack>
    );
}

export default CurrentPlan;