import { Popover, PopoverArrow, PopoverContent } from '@chakra-ui/react'
import React from 'react'
import ShippingAvailabilityButton from './ShippingAvailabilityButton'
import ShippingAvailabilityContent from './content/ShippingAvailabilityContent'

function ShippingAvailabilityPopover() {
    return (
        <Popover>
            <ShippingAvailabilityButton />
            <PopoverContent
                w="660px"
                border="1px solid #292929"
                borderRadius={16}
                padding={0}
                bgColor="#1C1C1C"
            >
                <PopoverArrow borderTop="1px solid #292929" borderLeft="1px solid #292929" bgColor="#1C1C1C" boxShadow="none" />
                <ShippingAvailabilityContent />
            </PopoverContent>
        </Popover>
    )
}

export default ShippingAvailabilityPopover