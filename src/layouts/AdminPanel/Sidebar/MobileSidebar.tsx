import { Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react'
import { useProducerLayout } from 'context/ProducerLayoutContext'
import React from "react"
import { NavLinks } from './NavLinks'

export const MobileSidebar = () => {
    const { isSidebarOpen, toggleSidebar } = useProducerLayout()

    return (
        <Drawer isOpen={isSidebarOpen} onClose={toggleSidebar} placement="left">
            <DrawerOverlay />
            <DrawerContent>
                <NavLinks />
            </DrawerContent>
        </Drawer>
    )
}