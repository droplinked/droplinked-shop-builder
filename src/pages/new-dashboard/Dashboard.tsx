import { Flex } from '@chakra-ui/react'
import React from 'react'
import DoubleColumnContainer from './components/DoubleColumnContainer'
import EmptyState from './components/EmptyState/EmptyState'
import GreetingBanner from './components/GreetingBanner'
import MetricsDashboard from './components/Metrics/DashboardMetrics'
import ResourceGroup from './components/ResourceGroup/ResourceGroup'
import SectionContainer from './components/SectionContainer'

function Dashboard() {
    const blogs = [
        { title: "Blog 1", description: "This is blog 1", link: "/blog/1" },
        { title: "Blog 2", description: "This is blog 2", link: "/blog/2" },
        { title: "Blog 3", description: "This is blog 3", link: "/blog/3" },
    ]

    const helpLinks = [
        { title: "Help Topic 1", description: "Details about help topic 1", link: "/help/1" },
        { title: "Help Topic 2", description: "Details about help topic 2", link: "/help/2" },
        { title: "Help Topic 3", description: "Details about help topic 3", link: "/help/3" },
    ]

    return (
        <Flex direction="column" gap={12}>
            <GreetingBanner />
            <MetricsDashboard />
            <DoubleColumnContainer>
                <SectionContainer title='Order Summary'>
                    <EmptyState
                        image='https://upload-file-droplinked.s3.amazonaws.com/88ed459467914a77c84c54b9b845eb0b71e8113fdc359d55855b71a8c5675902.png'
                        title='No Orders Yet'
                        description='Learn how to promote and grow across the network'
                        linkText='Learn More'
                        linkTo='https://www.google.com/'
                    />
                </SectionContainer>
                <SectionContainer title='Affiliate'>

                </SectionContainer>
            </DoubleColumnContainer>

            <DoubleColumnContainer>
                <ResourceGroup title="Blog" items={blogs} />
                <ResourceGroup title="Help Center" items={helpLinks} />
            </DoubleColumnContainer>
        </Flex>
    )
}

export default Dashboard