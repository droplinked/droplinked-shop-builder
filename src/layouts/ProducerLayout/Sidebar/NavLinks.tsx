import { FlexProps } from '@chakra-ui/react'
import DashboardLayoutSidebarGrowthHack from 'components/layouts/dashboard/components/sidebar/components/GrowthHack/DashboardLayoutSidebarGrowthHack'
import { AppAccordion } from 'components/redesign/accordion/AppAccordion'
import { producerSidebarLinks } from 'data/producerSidebarLinks'
import React from 'react'
import SidebarGroup from './SidebarGroup'

export default function NavLinks({ ...props }: FlexProps) {
    return (
        <AppAccordion
            display="flex"
            flexDirection="column"
            gap={6}
            userSelect="none"
            {...props}
        >
            {producerSidebarLinks.map((sidebarGroup, index) => (
                <SidebarGroup key={index} sidebarGroup={sidebarGroup} />
            ))}
            <DashboardLayoutSidebarGrowthHack />
        </AppAccordion>
    )
}