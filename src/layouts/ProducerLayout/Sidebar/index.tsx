import { GridItem } from '@chakra-ui/react'
import { useProducerLayout } from 'context/ProducerLayoutContext'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import MobileSidebar from './MobileSidebar'
import TabletSidebar from './TabletSidebar/TabletSidebar'

export const Sidebar = () => {
    const { breakpoint } = useProducerLayout()
    const { isRTL } = useLocaleResources("layout/ProducerLayout")

    if (breakpoint === 'mobile') return <MobileSidebar />

    return (
        <GridItem
            as="aside"
            position="sticky"
            top={0}
            height="100vh"
            display="flex"
            flexDirection="column"
            gap={6}
            rowSpan={3}
            borderRight={isRTL ? "none" : "1px solid"}
            borderLeft={isRTL ? "1px solid" : "none"}
            borderColor="neutral.gray.800"
        >
            {breakpoint === 'tablet' ? <TabletSidebar /> : <DesktopSidebar />}
        </GridItem>
    )
}