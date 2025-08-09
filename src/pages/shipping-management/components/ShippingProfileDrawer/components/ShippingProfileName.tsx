import AppInput from 'components/redesign/input/AppInput'
import { useFormikContext } from 'formik'
import React from 'react'

function ShippingProfileName() {
    const { values, handleChange, handleBlur, touched, errors } = useFormikContext<{ name: string }>()

    const hasError = Boolean(touched.name && errors.name)

    return (
        <AppInput
            label="Profile Name"
            description='Keep shipping profiles uniquely identifiable by name. This will not be visible to customers.'
            state={hasError ? 'error' : undefined}
            message={hasError ? String(errors.name) : undefined}
            inputProps={{
                name: 'name',
                placeholder: 'i.e. (Standard Shipping, Express Shipping)',
                isRequired: true,
                fontSize: 16,
                value: values.name,
                onChange: handleChange,
                onBlur: handleBlur,
            }}
        />
    )
}

export default ShippingProfileName