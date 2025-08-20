import AppSelect from 'components/redesign/select/AppSelect'
import React from 'react'
import { SHIPPING_METHOD } from '../../types/shipping'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    value: SHIPPING_METHOD
    onChange: (value: SHIPPING_METHOD) => void
}

export default function ShippingMethodSelect({ value, onChange }: Props) {
    const { t } = useLocaleResources("shipping-management")
    return (
        <AppSelect
            label={t('ShippingMethodSelect.label')}
            isRequired
            labelAccessor="name"
            valueAccessor="value"
            selectProps={{
                value,
                onChange: (e) => onChange(e.target.value as SHIPPING_METHOD)
            }}
            items={[
                { name: t('ShippingMethodSelect.items.carrierServices'), value: SHIPPING_METHOD.THIRD_PARTY },
                { name: t('ShippingMethodSelect.items.customRates'), value: SHIPPING_METHOD.CUSTOM },
            ]}
        />
    )
}


