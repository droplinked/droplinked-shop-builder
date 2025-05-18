import { GridItem } from '@chakra-ui/react'
import { useProducerLayout } from 'context/ProducerLayoutContext'
import React from 'react'
import { DesktopSidebar } from './DesktopSidebar'
import { MobileSidebar } from './MobileSidebar'
import { TabletSidebar } from './TabletSidebar'

export const Sidebar = () => {
    const { breakpoint } = useProducerLayout()

    if (breakpoint === 'mobile') return <MobileSidebar />

    return (
        <GridItem rowSpan={3} >
            {breakpoint === 'tablet' ? <TabletSidebar /> : <DesktopSidebar />}
        </GridItem>
    )
}