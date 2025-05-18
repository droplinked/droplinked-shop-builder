import { UseDisclosureReturn } from '@chakra-ui/react'
import React from "react"
import { DesktopSidebar } from './DesktopSidebar'
import { MobileSidebar } from './MobileSidebar'
import { TabletSidebar } from './TabletSidebar'

interface SidebarProps {
    breakpoint: 'mobile' | 'tablet' | 'desktop'
    disclosure: Pick<UseDisclosureReturn, 'isOpen' | 'onClose'>
}

export const Sidebar = ({ breakpoint, disclosure }: SidebarProps) => {
    if (breakpoint === 'mobile') return <MobileSidebar disclosure={disclosure} />
    else if (breakpoint === 'tablet') return <TabletSidebar />
    return <DesktopSidebar />
}