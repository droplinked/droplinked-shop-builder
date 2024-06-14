import AppTypography from 'components/common/typography/AppTypography'
import { getShopSubscriptionDataService } from 'lib/apis/subscription/subscriptionServices'
import useShopPermissionsStore from 'lib/stores/app/shopPermissionsStore'
import React from 'react'
import { useQuery } from 'react-query'
import CurrentPlanDetails from './_components/details/CurrentPlanDetails'
import Loading from './_components/loading/Loading'

function CurrentPlan() {
    const updateShopSubscriptionData = useShopPermissionsStore(state => state.updateShopSubscriptionData)
    const { isFetching, isError, data } = useQuery({
        queryKey: "shop-subscription-plan",
        queryFn: () => getShopSubscriptionDataService(),
        refetchOnWindowFocus: false,
        onSuccess: (data) => updateShopSubscriptionData(data.data)
    })

    if (isFetching) return <Loading />

    if (isError) return <AppTypography fontSize={16} color={"red.400"}>Oops! It looks like we can not access subscription data at the moment. Give it another try soon?</AppTypography>

    return <CurrentPlanDetails shopSubscriptionData={data.data} />
}

export default CurrentPlan