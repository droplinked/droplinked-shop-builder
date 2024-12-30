import { PlacementWithLogical, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'
import ProductTypes from './ProductTypes'

interface Props extends PropsWithChildren {
    placement?: PlacementWithLogical
}

function ProductTypesPopover({ placement = 'bottom-start', children }: Props) {
    return (
        <Popover placement={placement}>
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