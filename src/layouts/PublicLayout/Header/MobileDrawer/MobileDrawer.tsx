import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react'
import React from 'react'
import QuickLinks from '../QuickLinks/QuickLinks'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export default function MobileDrawer({ isOpen, onClose }: Props) {
    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement="left"
            size="full"
        >
            <DrawerOverlay bg="rgba(0, 0, 0, 0.75)" />
            <DrawerContent
                bg="neutral.websiteBackground"
            >
                <DrawerHeader>
                    <DrawerCloseButton />
                </DrawerHeader>
                <DrawerBody>
                    <QuickLinks />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}