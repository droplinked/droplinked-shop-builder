import AppInput from 'components/redesign/input/AppInput'
import useShippingManagementStore from 'pages/shipping-management/stores/useShippingManagementStore'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

function ShippingProfileName() {
    const { t } = useLocaleResources("shipping-management")
    const { name, updateShippingProfile } = useShippingManagementStore(s => ({
        name: s.shippingProfile.name,
        updateShippingProfile: s.updateShippingProfile
    }))

    return (
        <AppInput
            label={t('ShippingProfileName.label')}
            description={t('ShippingProfileName.description')}
            inputProps={{
                name: 'profileName',
                value: name,
                onChange: (e) => updateShippingProfile('name', e.target.value),
                placeholder: t('ShippingProfileName.placeholder'),
                isRequired: true,
                fontSize: 16,
            }}
        />
    )
}

export default ShippingProfileName