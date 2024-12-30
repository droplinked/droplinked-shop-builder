import { PopoverTrigger } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import BlueButton from 'components/redesign/button/BlueButton'
import React from 'react'

function ShippingAvailabilityButton() {
    return (
        <PopoverTrigger>
            <BlueButton gap={2}>
                <AppIcons.DeliveryTruck />
                Shipping Availability
            </BlueButton>
        </PopoverTrigger>
    )
}

export default ShippingAvailabilityButton