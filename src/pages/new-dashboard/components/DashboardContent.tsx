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

    const handleLinkClick = (url: string) => window.open(url, '_blank')

    return (
        <>
            <MetricsDashboard />

            <DoubleColumnContainer>
                <OrderSummary />
                <AffiliateMarket />
            </DoubleColumnContainer>

            <CommunityGrid />

            <DoubleColumnContainer>
                <ResourceGroup
                    title="Blog"
                    items={blogs}
                    onLinkClick={() => handleLinkClick("https://droplinked.com/blogs")}
                />
                <ResourceGroup
                    title="Help Center"
                    items={helpLinks}
                    onLinkClick={() => handleLinkClick("https://droplinked.gitbook.io/droplinked-store-front-help-center")}
                />
            </DoubleColumnContainer>
        </>
    )
}

export default DashboardContent