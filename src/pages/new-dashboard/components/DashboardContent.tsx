import React from 'react'
import useDashboardPageStore from '../stores/useDashboardStore'
import AffiliateMarket from './AffiliateMarket'
import CommunityGrid from './CommunityGrid'
import DoubleColumnContainer from './DoubleColumnContainer'
import MetricsDashboard from './Metrics/DashboardMetrics'
import OrderSummary from './OrderSummary'
import ResourceGroup from './ResourceGroup/ResourceGroup'

function DashboardContent() {
    const { blogs, helpLinks } = useDashboardPageStore()

    return (
        <>
            <MetricsDashboard />

            <DoubleColumnContainer>
                <OrderSummary />
                <AffiliateMarket />
            </DoubleColumnContainer>

            <CommunityGrid />

            <DoubleColumnContainer>
                <ResourceGroup title="Blog" items={blogs} />
                <ResourceGroup title="Help Center" items={helpLinks} />
            </DoubleColumnContainer>
        </>
    )
}

export default DashboardContent