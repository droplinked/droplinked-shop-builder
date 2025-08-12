import { SimpleGrid } from '@chakra-ui/react'
import { DollarMd } from 'assets/icons/Finance/Dollar/DollarMd'
import AppInput from 'components/redesign/input/AppInput'
import AppSelect from 'components/redesign/select/AppSelect'
import CurrencySelect from 'components/redesign/select/CurrencySelect'
import React from 'react'
import { CUSTOM_SHIPPING_TYPE, CustomShipping } from '../../types/shipping'
import LabeledContent from '../common/LabeledContent'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    value: CustomShipping
    onChange: (next: CustomShipping) => void
}

export default function CustomRateForm({ value, onChange }: Props) {
    const { t } = useLocaleResources("shipping-management")
    const update = (patch: Partial<CustomShipping>) => onChange({ ...value, ...patch })

    const { priceLabel, priceValue } = (() => {
        if (value.type === CUSTOM_SHIPPING_TYPE.FLAT_RATE) {
            return { priceLabel: t('CustomRateForm.price'), priceValue: value.price ?? '' }
        }
        if (value.type === CUSTOM_SHIPPING_TYPE.WEIGHT_BASED) {
            return { priceLabel: t('CustomRateForm.pricePerUnit'), priceValue: value.pricePerWeight ?? '' }
        }
        if (value.type === CUSTOM_SHIPPING_TYPE.ITEM_COUNT_BASED) {
            return { priceLabel: t('CustomRateForm.pricePerItem'), priceValue: value.pricePerItem ?? '' }
        }
        return { priceLabel: t('CustomRateForm.price'), priceValue: '' }
    })()

    const handlePriceChange = (newValue: number) => {
        if (value.type === CUSTOM_SHIPPING_TYPE.WEIGHT_BASED) return update({ pricePerWeight: newValue })
        if (value.type === CUSTOM_SHIPPING_TYPE.ITEM_COUNT_BASED) return update({ pricePerItem: newValue })
        return update({ price: newValue })
    }

    return (
        <>
            <AppSelect
                label={t('CustomRateForm.select.label')}
                isRequired
                labelAccessor="name"
                valueAccessor="value"
                selectProps={{
                    value: value.type,
                    onChange: (e) => {
                        const newType = e.target.value as CUSTOM_SHIPPING_TYPE
                        // Clear all price fields when switching types
                        update({
                            type: newType,
                            price: undefined,
                            pricePerWeight: undefined,
                            pricePerItem: undefined,
                        })
                    },
                }}
                items={[
                    { name: t('CustomRateForm.select.options.flatRate'), value: CUSTOM_SHIPPING_TYPE.FLAT_RATE },
                    { name: t('CustomRateForm.select.options.weightBasedRate'), value: CUSTOM_SHIPPING_TYPE.WEIGHT_BASED },
                    { name: t('CustomRateForm.select.options.perItemRate'), value: CUSTOM_SHIPPING_TYPE.ITEM_COUNT_BASED },
                ]}
            />

            <AppInput
                label={t('CustomRateForm.rateName.label')}
                description={t('CustomRateForm.rateName.description')}
                inputProps={{
                    value: value.rateName,
                    onChange: (e) => update({ rateName: e.target.value }),
                    placeholder: t('CustomRateForm.rateName.placeholder'),
                    isRequired: true,
                    fontSize: 16
                }}
            />

            <LabeledContent label={priceLabel} required>
                <SimpleGrid columns={2} gap={4}>
                    <AppInput
                        leftElement={<DollarMd color='#7b7b7b' />}
                        inputProps={{
                            value: priceValue,
                            onChange: (e) => handlePriceChange(Number(e.target.value)),
                            placeholder: '0.00',
                            type: 'number',
                            numberType: 'float',
                            fontSize: 16
                        }}
                    />

                    <CurrencySelect isDisabled />
                </SimpleGrid>
            </LabeledContent>

            <LabeledContent label={t('CustomRateForm.estimatedDelivery.label')} required>
                <SimpleGrid columns={2} gap={4}>
                    <AppInput
                        inputProps={{
                            value: value.estimatedDelivery?.minDays ?? '',
                            onChange: (e) => update({
                                estimatedDelivery: {
                                    minDays: Number(e.target.value),
                                    maxDays: value.estimatedDelivery?.maxDays ?? 0,
                                },
                            }),
                            placeholder: t('CustomRateForm.estimatedDelivery.placeholder.from'),
                            type: 'number',
                            numberType: 'int',
                            fontSize: 16
                        }}
                    />
                    <AppInput
                        inputProps={{
                            value: value.estimatedDelivery?.maxDays ?? '',
                            onChange: (e) => update({
                                estimatedDelivery: {
                                    minDays: value.estimatedDelivery?.minDays ?? 0,
                                    maxDays: Number(e.target.value),
                                },
                            }),
                            placeholder: t('CustomRateForm.estimatedDelivery.placeholder.to'),
                            type: 'number',
                            numberType: 'int',
                            fontSize: 16
                        }}
                    />
                </SimpleGrid>
            </LabeledContent>
        </>
    )
}