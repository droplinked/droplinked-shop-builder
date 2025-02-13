import { PlacementWithLogical, Popover, PopoverBody, PopoverContent, PopoverTrigger, useDisclosure, useOutsideClick } from '@chakra-ui/react'
import React, { PropsWithChildren, useRef } from 'react'
import ProductTypes from './ProductTypes'

interface Props extends PropsWithChildren {
    placement?: PlacementWithLogical
}

function ProductTypesPopover({ placement = 'bottom-start', children }: Props) {
    const popoverRef = useRef(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useOutsideClick({
        ref: popoverRef,
        handler: () => isOpen && onClose()
    })

    return (
        <Popover
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            placement={placement}
        >
            <PopoverTrigger>
                <div ref={popoverRef}>{children}</div>
            </PopoverTrigger>
            <PopoverContent
                width="500px"
                border="1px solid #292929"
                borderRadius={16}
                padding={0}
                backgroundColor="#141414"
            >
                <PopoverBody padding={4}>
                    <ProductTypes />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default ProductTypesPopover