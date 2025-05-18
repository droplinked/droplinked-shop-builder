import { Drawer, DrawerContent, DrawerOverlay, UseDisclosureReturn } from '@chakra-ui/react'
import React from "react"
import { NavLinks } from './NavLinks'

interface MobileSidebarProps {
    disclosure: Pick<UseDisclosureReturn, 'isOpen' | 'onClose'>
}

export const MobileSidebar = ({ disclosure }: MobileSidebarProps) => {
    return (
        <Drawer isOpen={disclosure.isOpen} onClose={disclosure.onClose} placement="left">
            <DrawerOverlay />
            <DrawerContent>
                <NavLinks />
            </DrawerContent>
        </Drawer>
    )
}