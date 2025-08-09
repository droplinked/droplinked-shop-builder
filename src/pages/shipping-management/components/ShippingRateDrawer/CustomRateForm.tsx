import { SimpleGrid } from '@chakra-ui/react'
import AppInput from 'components/redesign/input/AppInput'
import AppSelect from 'components/redesign/select/AppSelect'
import React from 'react'
import { CUSTOM_SHIPPING_TYPE, CustomShipping } from '../../types/shipping'
import TwinInputCard from '../common/TwinInputCard'

interface Props {
    value: CustomShipping
    onChange: (next: CustomShipping) => void
}

export default function CustomRateForm({ value, onChange }: Props) {
    const update = (patch: Partial<CustomShipping>) => onChange({ ...value, ...patch })

    return (
        <>
            <AppSelect
                label="Configure Custom Rate"
                isRequired
                labelAccessor="name"
                valueAccessor="value"
                selectProps={{
                    value: value.type,
                    onChange: (selected) => update({ type: (selected as any)?.value as CUSTOM_SHIPPING_TYPE }),
                }}
                items={[
                    { name: 'Flat Rate', value: CUSTOM_SHIPPING_TYPE.FLAT_RATE },
                    { name: 'Weight Based Rate', value: CUSTOM_SHIPPING_TYPE.WEIGHT_BASED },
                    { name: 'Per Item Rate', value: CUSTOM_SHIPPING_TYPE.ITEM_COUNT_BASED },
                ]}
            />

            <AppInput
                label='Rate Name'
                description='Rates are shown to customers as delivery options during checkout.'
                inputProps={{
                    placeholder: 'i.e. (Standard Shipping, Express Shipping)',
                    isRequired: true,
                    value: value.rateName,
                    onChange: (e) => update({ rateName: e.target.value }),
                }}
            />

            <TwinInputCard label='Estimated Delivery Time (In Days)'>
                <SimpleGrid columns={2} gap={4}>
                    <AppInput
                        inputProps={{
                            placeholder: 'From',
                            type: 'number',
                            numberType: 'int',
                            value: value.estimatedDelivery?.minDays ?? '',
                            onChange: (e) => update({
                                estimatedDelivery: {
                                    minDays: Number(e.target.value),
                                    maxDays: value.estimatedDelivery?.maxDays ?? 0,
                                },
                            }),
                        }}
                    />
                    <AppInput
                        inputProps={{
                            placeholder: 'To',
                            type: 'number',
                            numberType: 'int',
                            value: value.estimatedDelivery?.maxDays ?? '',
                            onChange: (e) => update({
                                estimatedDelivery: {
                                    minDays: value.estimatedDelivery?.minDays ?? 0,
                                    maxDays: Number(e.target.value),
                                },
                            }),
                        }}
                    />
                </SimpleGrid>
            </TwinInputCard>

            {value.type === CUSTOM_SHIPPING_TYPE.FLAT_RATE && (
                <AppInput
                    label='Flat Rate Amount'
                    inputProps={{
                        placeholder: '0.00',
                        type: 'number',
                        numberType: 'float',
                        value: value.price ?? '',
                        onChange: (e) => update({ price: Number(e.target.value) }),
                    }}
                />
            )}

            {value.type === CUSTOM_SHIPPING_TYPE.WEIGHT_BASED && (
                <AppInput
                    label='Price Per Weight Unit'
                    inputProps={{
                        placeholder: '0.00',
                        type: 'number',
                        numberType: 'float',
                        value: value.pricePerWeight ?? '',
                        onChange: (e) => update({ pricePerWeight: Number(e.target.value) }),
                    }}
                />
            )}

            {value.type === CUSTOM_SHIPPING_TYPE.ITEM_COUNT_BASED && (
                <AppInput
                    label='Price Per Item'
                    inputProps={{
                        placeholder: '0.00',
                        type: 'number',
                        numberType: 'float',
                        value: value.pricePerItem ?? '',
                        onChange: (e) => update({ pricePerItem: Number(e.target.value) }),
                    }}
                />
            )}
        </>
    )
}


