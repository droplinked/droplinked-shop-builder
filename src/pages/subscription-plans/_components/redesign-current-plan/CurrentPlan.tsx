import { HStack, VStack } from '@chakra-ui/react';
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import Button from 'components/redesign/button/Button';
import useShopSubscriptionData from 'hooks/shop-subscription-data/useShopSubscriptionData';
import { getSubscriptionPlanIcon } from 'utils/helpers';
import * as React from 'react';
import PlanBadge from './_components/PlanBadge';
import PlanDescription from './_components/PlanDescription';
import StatisticModal from './_components/statistics/StatisticModal';
interface ICurrentSubData {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    title: string
}
function NewCurrentPlan() {
    const { isFetching, data } = useShopSubscriptionData();
    if (isFetching) {
        return <AppSkeleton borderRadius={"8px"} isLoaded={!isFetching} width={"100%"} height={"6rem"} />
    }
    const { type } = data.data.subscriptionId;
    const currentSubData: ICurrentSubData = getSubscriptionPlanIcon(type);
    return (
        <VStack backgroundColor={"#1C1C1C"} borderRadius={"8px"} padding={"36px"} justifyItems={"start"} alignItems={"start"}>
            <HStack flexWrap={"wrap"} justifyContent={"space-between"} width={"100%"}>
                <PlanBadge currentSubData={currentSubData} data={data} />
                <HStack gap={"1rem"} flexWrap={"wrap"}>
                    {type !== "STARTER" && <Button backgroundColor={"transparent"} border={"none"} color={"white"} onClick={() => window.open('mailto:support@droplinked.com')}>Cancel Subscription</Button>}
                    <StatisticModal data={data} />
                </HStack>
            </HStack>
            <PlanDescription data={data} currentSubData={currentSubData} />
        </VStack>
    );
}

export default NewCurrentPlan;