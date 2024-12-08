import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react'
import React from 'react'

interface Props {
    isOpen: boolean
    onClose: () => void
}

function ProductFormDrawer({ isOpen, onClose }: Props) {
    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            size="lg"
        >
            <DrawerOverlay />
            <DrawerContent
                marginBlock={4}
                marginInline={10}
                borderRadius={16}
                bgColor="#141414"
            >
                <DrawerCloseButton />
                <DrawerHeader>Right-Side Sliding Panel</DrawerHeader>

                <DrawerBody>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default ProductFormDrawer