import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, VStack } from '@chakra-ui/react'
import React from 'react'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export default function PlatformSubmenu({ isOpen, onClose }: Props) {
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
                    <VStack spacing={4} align="stretch">
                        <Button
                            onClick={onClose}
                            colorScheme="gray"
                            size="lg"
                        >
                            Back to Main Menu
                        </Button>
                        {/* Add your platform submenu items here */}
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
} 