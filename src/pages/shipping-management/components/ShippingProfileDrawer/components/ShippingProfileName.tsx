import AppInput from 'components/redesign/input/AppInput'
import React from 'react'

function ShippingProfileName() {
    return (
        <AppInput
            label="Profile Name"
            description='Keep shipping profiles uniquely identifiable by name. This will not be visible to customers.'
            inputProps={{
                name: 'name',
                placeholder: 'i.e. (Standard Shipping, Express Shipping)',
                isRequired: true,
                fontSize: 16
            }}
        />
    )
}

export default ShippingProfileName