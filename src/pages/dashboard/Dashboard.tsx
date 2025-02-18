import { Flex } from '@chakra-ui/react'
import React from 'react'
import DashboardContent from './components/DashboardContent'
import DashboardLoading from './components/DashboardLoading'
import GreetingBanner from './components/GreetingBanner'
import NoOrdersPlaceholder from './components/NoOrdersPlaceholder'
import useDashboardPageData from './hooks/useDashboardPageData'

function Dashboard() {
    const { isFetching, isError, data } = useDashboardPageData()

    function renderContent() {
        if (isFetching) return <DashboardLoading />
        else if (isError || data?.shopStats?.orders === 0) return <NoOrdersPlaceholder />
        else return <DashboardContent />
    }

    return (
        <Flex direction="column" gap={{ base: 6, md: 9, lg: 12 }}>
            <GreetingBanner />
            {renderContent()}
        </Flex>
    )
}

export default Dashboard