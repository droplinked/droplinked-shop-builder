import { PopoverTrigger } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import BlueButton from 'components/redesign/button/BlueButton'
import React from 'react'

function ShippingAvailabilityButton() {
    return (
        <PopoverTrigger>
            <div>
                <BlueButton
                    height="fit-content"
                    gap={2}
                    padding={0}
                    sx={{ svg: { flexShrink: 0 } }}
                >
                    <AppIcons.DeliveryTruck />
                    Shipping Availability
                </BlueButton>
            </div>
        </PopoverTrigger>
    )
}

export default ShippingAvailabilityButton