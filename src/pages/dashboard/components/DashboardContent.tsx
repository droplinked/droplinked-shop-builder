import React from 'react'
import CommunityEngagement from './CommunityEngagement/CommunityEngagement'
import DashboardSummary from './DashboardSummary/DashboardSummary'
import ResourceLinks from './ResourceLinks/ResourceLinks'
import SalesAndAffiliates from './SalesAndAffiliates/SalesAndAffiliates'

function DashboardContent() {
    return (
        <>
            <DashboardSummary />
            <SalesAndAffiliates />
            <CommunityEngagement />
            <ResourceLinks />
        </>
    )
}

export default DashboardContent