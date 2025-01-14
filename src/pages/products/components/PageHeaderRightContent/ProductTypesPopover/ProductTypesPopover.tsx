import { PlacementWithLogical, Popover, PopoverBody, PopoverContent, PopoverTrigger, useDisclosure, useOutsideClick } from '@chakra-ui/react'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import React, { PropsWithChildren, useRef } from 'react'
import ProductTypes from './ProductTypes'

interface Props extends PropsWithChildren {
    placement?: PlacementWithLogical
}

function ProductTypesPopover({ placement = 'bottom-start', children }: Props) {
    const popoverRef = useRef(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isProductTypePopoverOpen, updateProductPageState, resetProductPageState } = useProductPageStore()

    useOutsideClick({ ref: popoverRef, handler: closePopover })

    function openPopover() {
        if (isProductTypePopoverOpen) return
        updateProductPageState("isProductTypePopoverOpen", true)
        onOpen()
    }

    function closePopover() {
        resetProductPageState()
        onClose()
    }

    return (
        <Popover
            isOpen={isOpen}
            onOpen={openPopover}
            onClose={closePopover}
            placement={placement}
        >
            <PopoverTrigger>
                <div ref={popoverRef}>{children}</div>
            </PopoverTrigger>
            <PopoverContent
                width="500px"
                borderRadius={16}
                backgroundColor="#141414"
                border="none"
                padding={0}
            >
                <PopoverBody padding={4}>
                    <ProductTypes />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default ProductTypesPopover