import { Popover, PopoverArrow, PopoverContent } from '@chakra-ui/react'
import React from 'react'
import ShippingAvailabilityButton from './ShippingAvailabilityButton'
import ShippingAvailabilityContent from './content/ShippingAvailabilityContent'

function ShippingAvailabilityPopover() {
    return (
        <Popover
            placement="bottom-start"
        >
            <ShippingAvailabilityButton />
            <PopoverContent
                w={{ base: "360px", md: "660px" }}
                border="1px solid #292929"
                borderRadius={16}
                padding={0}
                bgColor="#1C1C1C"
                sx={{
                    ".chakra-popover__arrow-positioner": {
                        width: "16px !important",
                        height: "16px !important",
                        "--popper-arrow-size-half": "9px !important"
                    }
                }}
            >
                <PopoverArrow
                    borderTop="1px solid #292929"
                    borderLeft="1px solid #292929"
                    bgColor="#1C1C1C"
                    boxShadow="none"
                />
                <ShippingAvailabilityContent />
            </PopoverContent>
        </Popover>
    )
}

export default ShippingAvailabilityPopover