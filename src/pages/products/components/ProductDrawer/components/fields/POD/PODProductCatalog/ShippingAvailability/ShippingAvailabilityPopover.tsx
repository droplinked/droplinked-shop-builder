import { Popover, PopoverArrow, PopoverContent } from '@chakra-ui/react'
import React from 'react'
import ShippingAvailabilityButton from './ShippingAvailabilityButton'
import ShippingAvailabilityContent from './ShippingAvailabilityContent'

function ShippingAvailabilityPopover() {
    return (
        <Popover placement="bottom-start">
            <ShippingAvailabilityButton />
            <PopoverContent
                w={{ base: "360px", md: "660px" }}
                mt={2}
                border="1px solid"
                borderColor="neutral.gray.800"
                borderRadius={16}
                padding={0}
                bgColor="neutral.gray.1000"
                sx={{
                    ".chakra-popover__arrow-positioner": {
                        width: "16px !important",
                        height: "16px !important",
                        "--popper-arrow-size-half": "9px !important"
                    }
                }}
            >
                <PopoverArrow
                    borderTop="1px solid"
                    borderLeft="1px solid"
                    borderColor="neutral.gray.800"
                    bgColor="neutral.gray.1000"
                    boxShadow="none"
                />
                <ShippingAvailabilityContent />
            </PopoverContent>
        </Popover>
    )
}

export default ShippingAvailabilityPopover