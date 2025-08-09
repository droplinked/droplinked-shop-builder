import AppSelect from 'components/redesign/select/AppSelect'
import React from 'react'
import { SHIPPING_METHOD } from '../../types/shipping'

interface Props {
    value: SHIPPING_METHOD
    onChange: (value: SHIPPING_METHOD) => void
}

export default function ShippingMethodSelect({ value, onChange }: Props) {
    return (
        <AppSelect
            label="Set Shipping Rates"
            isRequired
            labelAccessor="name"
            valueAccessor="value"
            selectProps={{
                value,
                onChange: (e) => onChange(e.target.value as SHIPPING_METHOD)
            }}
            items={[
                { name: 'Carrier Services', value: SHIPPING_METHOD.THIRD_PARTY },
                { name: 'Custom Rates', value: SHIPPING_METHOD.CUSTOM },
            ]}
        />
    )
}


