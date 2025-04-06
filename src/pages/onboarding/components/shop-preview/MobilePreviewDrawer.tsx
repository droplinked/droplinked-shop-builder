import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from '@chakra-ui/react'
import { ChevrondownLg } from 'assets/icons/Navigation/ChevronDown/ChevrondownLg'
import React from 'react'
import MobileDrawerButton from './MobileDrawerButton'
import MobilePreview from './MobilePreview'
import ShopPreviewHeader from './ShopPreviewHeader'

export default function MobilePreviewDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <MobileDrawerButton onOpen={onOpen} />
            <Drawer
                isOpen={isOpen}
                placement="bottom"
                onClose={onClose}
                size="full"
            >
                <DrawerOverlay />
                <DrawerContent background="#1C1C1C">
                    <DrawerHeader borderColor="#292929" background="#141414">
                        <ShopPreviewHeader
                            rightIcon={<ChevrondownLg color='#fff' />}
                            onClick={onClose}
                        />
                    </DrawerHeader>
                    <DrawerBody padding="0">
                        <MobilePreview />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
