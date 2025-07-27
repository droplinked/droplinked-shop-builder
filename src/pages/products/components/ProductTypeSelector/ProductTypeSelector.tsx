import { Drawer, DrawerContent, DrawerOverlay, PlacementWithLogical, Popover, PopoverBody, PopoverContent, PopoverTrigger, useBreakpointValue, useDisclosure, useOutsideClick } from '@chakra-ui/react'
import React, { PropsWithChildren, useRef } from 'react'
import ProductTypeList from './ProductTypeList'

interface Props extends PropsWithChildren {
    placement?: PlacementWithLogical
}

function ProductTypeSelector({ placement = 'bottom-start', children }: Props) {
    const triggerRef = useRef(null)
    const disclosure = useDisclosure()
    const isMobile = useBreakpointValue({ base: true, md: false })

    useOutsideClick({
        ref: triggerRef,
        handler: () => {
            const { isOpen, onClose } = disclosure
            if (isOpen) onClose()
        }
    })

    // Mobile view: Bottom sheet drawer
    if (isMobile) {
        return (
            <>
                <div onClick={disclosure.onOpen}>{children}</div>
                <Drawer {...disclosure} placement="bottom">
                    <DrawerOverlay />
                    <DrawerContent
                        borderTopRadius={16}
                        padding={4}
                        bgColor="neutral.background"
                    >
                        <ProductTypeList />
                    </DrawerContent>
                </Drawer>
            </>
        )
    }

    // Desktop/Tablet view: Popover
    return (
        <Popover {...disclosure} placement={placement}>
            <PopoverTrigger>
                <div ref={triggerRef}>{children}</div>
            </PopoverTrigger>
            <PopoverContent
                width="500px"
                border="1px solid"
                borderColor="neutral.gray.800"
                borderRadius={16}
                padding={0}
                backgroundColor="#141414"
            >
                <PopoverBody padding={4}>
                    <ProductTypeList />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default ProductTypeSelector 