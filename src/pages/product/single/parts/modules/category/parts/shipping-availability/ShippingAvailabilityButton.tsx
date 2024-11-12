import { Flex, PopoverTrigger } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React from 'react'

function ShippingAvailabilityButton() {
    return (
        <PopoverTrigger>
            <Flex
                as="button"
                alignItems="center"
                gap={2}
                fontSize={12}
                fontWeight={500}
                color="#179EF8"
            >
                <AppIcons.DeliveryTruck />
                Shipping Availability
            </Flex>
        </PopoverTrigger>
    )
}

export default ShippingAvailabilityButton