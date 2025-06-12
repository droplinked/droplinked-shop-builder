import { Drawer, DrawerCloseButton, DrawerContent, DrawerOverlay } from '@chakra-ui/react'
import React from 'react'

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
                <DrawerCloseButton />
            </DrawerContent>
        </Drawer>
    )
}