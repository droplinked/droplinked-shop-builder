import { useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import CommunityEngagement from '../../../components/redesign/community-engagement/CommunityEngagement'
import DashboardSummary from './DashboardSummary/DashboardSummary'
import ResourceLinks from './ResourceLinks/ResourceLinks'
import SalesAndAffiliates from './SalesAndAffiliates/SalesAndAffiliates'

function DashboardContent() {
    const [isMd] = useMediaQuery('(min-width: 768px)')
    const [isLg] = useMediaQuery('(min-width: 1280px)')

    const communityEngagementColumns = isLg ? 4 : isMd ? 2 : 1

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