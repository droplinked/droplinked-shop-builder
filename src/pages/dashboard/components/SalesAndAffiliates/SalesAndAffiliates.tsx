import useDashboardPageStore from 'pages/dashboard/stores/useDashboardStore'
import React from 'react'
import DoubleColumnContainer from '../DoubleColumnContainer'
import AffiliateProgramCard from './AffiliateProgramCard'
import OrderSummaryCard from './OrderSummaryCard'

function SalesAndAffiliates() {
    const { isLoading, recentOrders } = useDashboardPageStore(state => ({
        isLoading: state.isLoading,
        recentOrders: state.dashboardData.recentOrders
    }))

    return (
        <DoubleColumnContainer>
            <OrderSummaryCard isLoading={isLoading} recentOrders={recentOrders} />
            <AffiliateProgramCard isLoading={isLoading} />
        </DoubleColumnContainer>
    )
}

export default SalesAndAffiliates