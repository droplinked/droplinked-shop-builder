import { Flex, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import CommunityEngagement from '../../../components/redesign/community-engagement/CommunityEngagement'
import DashboardSummary from './DashboardSummary/DashboardSummary'
import GreetingBanner from './GreetingBanner'
import ResourceLinks from './ResourceLinks/ResourceLinks'
import SalesAndAffiliates from './SalesAndAffiliates/SalesAndAffiliates'

function DashboardContent() {
    const communityEngagementColumns = useBreakpointValue({ base: 1, md: 2, lg: 4 })

    return (
        <Flex direction="column" gap={{ base: 6, lg: 9, xl: 12 }}>
            <GreetingBanner />
            <DashboardSummary />
            <SalesAndAffiliates />
            <CommunityEngagement columns={communityEngagementColumns} />
            <ResourceLinks />
        </Flex>
    )
}

export default DashboardContent