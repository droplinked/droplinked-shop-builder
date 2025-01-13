import { PlacementWithLogical, Popover, PopoverBody, PopoverContent, PopoverTrigger, useDisclosure } from '@chakra-ui/react'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import React, { PropsWithChildren } from 'react'
import ProductTypes from './ProductTypes'

interface Props extends PropsWithChildren {
    placement?: PlacementWithLogical
}

function ProductTypesPopover({ placement = 'bottom-start', children }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isProductTypePopoverOpen, updateProductPageState, resetProductPageState } = useProductPageStore()

    const openPopover = () => {
        if (isProductTypePopoverOpen) return
        updateProductPageState("isProductTypePopoverOpen", true)
        onOpen()
    }

    const closePopover = () => {
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
                <div>
                    {children}
                </div>
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