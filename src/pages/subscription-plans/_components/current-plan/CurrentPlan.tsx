import AppTypography from 'components/common/typography/AppTypography'
import useShopSubscriptionData from 'functions/hooks/shop-subscription-data/useShopSubscriptionData'
import AppErrors from 'lib/utils/statics/errors/errors'
import React from 'react'
import CurrentPlanDetails from './_components/details/CurrentPlanDetails'
import Loading from './_components/loading/Loading'

function CurrentPlan() {
    const { isFetching, isError, data } = useShopSubscriptionData()

    if (isFetching) return <Loading />

    if (isError) return <AppTypography fontSize={16} color={"red.400"}>{AppErrors.permission.shop_subscription_data_unavailable}</AppTypography>

    return <CurrentPlanDetails shopSubscriptionData={data.data} />
}

export default CurrentPlan