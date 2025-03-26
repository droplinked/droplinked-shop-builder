import { useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import CommunityEngagement from '../../../components/redesign/community-engagement/CommunityEngagement'
import DashboardSummary from './DashboardSummary/DashboardSummary'
import ResourceLinks from './ResourceLinks/ResourceLinks'
import SalesAndAffiliates from './SalesAndAffiliates/SalesAndAffiliates'

function DashboardContent() {
    const communityEngagementColumns = useBreakpointValue({ base: 1, md: 2, lg: 4 })

    return (
        <>
            <DashboardSummary />
            <SalesAndAffiliates />
            <CommunityEngagement columns={communityEngagementColumns} />
            <ResourceLinks />
        </>
    )
}

export default DashboardContent