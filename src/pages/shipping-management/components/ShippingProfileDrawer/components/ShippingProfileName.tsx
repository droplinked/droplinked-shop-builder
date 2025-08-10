import AppInput from 'components/redesign/input/AppInput'
import useShippingManagementStore from 'pages/shipping-management/stores/useShippingManagementStore'
import React from 'react'

function ShippingProfileName() {
    const { name, updateShippingProfile } = useShippingManagementStore(s => ({
        name: s.name,
        updateShippingProfile: s.updateShippingProfile
    }))

    return (
        <AppInput
            label="Profile Name"
            description='Keep shipping profiles uniquely identifiable by name. This will not be visible to customers.'
            inputProps={{
                name: 'profileName',
                value: name,
                onChange: (e) => updateShippingProfile('name', e.target.value),
                placeholder: 'i.e. (Standard Shipping, Express Shipping)',
                isRequired: true,
                fontSize: 16,
            }}
        />
    )
}

export default ShippingProfileName