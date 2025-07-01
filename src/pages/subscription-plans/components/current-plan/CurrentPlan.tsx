import { HStack, VStack } from '@chakra-ui/react';
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import useShopSubscriptionData from 'hooks/shop-subscription-data/useShopSubscriptionData';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import * as React from 'react';
import { getPlanDetails } from 'utils/helpers';
import PlanBadge from './components/PlanBadge';
import PlanDescription from './components/PlanDescription';
import StatisticModal from './components/statistics/StatisticModal';

function CurrentPlan() {
    const { isFetching, data } = useShopSubscriptionData();
    const subscriptionData = data?.data;
    const planType = subscriptionData?.subscriptionId?.type;
    const { t } = useLocaleResources('subscription');

    if (isFetching || !planType) {
        return <AppSkeleton borderRadius={"8px"} isLoaded={!isFetching} width={"100%"} height={"6rem"} />
    }

    const currentPlanInformation = getPlanDetails(planType, t);

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
                <HStack gap={"1rem"} flexWrap={"wrap"}>
                    {/* {type !== 'STARTER' && (
                    <AppButton
                        variant='normal'
                        color="neutral.white"
                        onClick={() => window.open('mailto:support@droplinked.com')}
                    >
                    Cancel Subscription
                    </AppButton>
                )} */}
                    <StatisticModal data={subscriptionData} />
                </HStack>
            </HStack>
            <PlanDescription data={subscriptionData} currentSubData={currentPlanInformation} />
        </VStack>
    );
}

export default CurrentPlan;