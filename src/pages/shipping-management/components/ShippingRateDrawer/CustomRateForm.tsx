import { SimpleGrid } from '@chakra-ui/react'
import CurrencyIcon from 'components/redesign/currency-icon/CurrencyIcon'
import AppInput from 'components/redesign/input/AppInput'
import AppSelect from 'components/redesign/select/AppSelect'
import CurrencySelect from 'components/redesign/select/CurrencySelect'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import useAppStore from 'stores/app/appStore'
import { CUSTOM_SHIPPING_TYPE, CustomShipping } from '../../types/shipping'
import LabeledContent from '../common/LabeledContent'

interface Props {
    value: CustomShipping
    onChange: (next: CustomShipping) => void
}

export default function CustomRateForm({ value, onChange }: Props) {
    const { t } = useLocaleResources("shipping-management")
    const { shop } = useAppStore()

    const update = (patch: Partial<CustomShipping>) => onChange({ ...value, ...patch })

    const isWeightBased = value.type === CUSTOM_SHIPPING_TYPE.WEIGHT_BASED
    const isItemCountBased = value.type === CUSTOM_SHIPPING_TYPE.ITEM_COUNT_BASED
    const isFlatRate = value.type === CUSTOM_SHIPPING_TYPE.FLAT_RATE

    const { priceLabel, priceValue } = (() => {
        if (isFlatRate) return { priceLabel: t('CustomRateForm.price'), priceValue: value.price ?? '' }
        if (isWeightBased) return { priceLabel: t('CustomRateForm.pricePerUnit'), priceValue: value.pricePerWeight ?? '' }
        if (isItemCountBased) return { priceLabel: t('CustomRateForm.pricePerItem'), priceValue: value.pricePerItem ?? '' }
        return { priceLabel: t('CustomRateForm.price'), priceValue: '' }
    })()

    const handlePriceChange = (newValue: number) => {
        if (isWeightBased) return update({ pricePerWeight: newValue })
        if (isItemCountBased) return update({ pricePerItem: newValue })
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
                        leftElement={<CurrencyIcon color='#7b7b7b' size='md' />}
                        inputProps={{
                            value: priceValue,
                            onChange: (e) => handlePriceChange(Number(e.target.value)),
                            placeholder: '0.00',
                            type: 'number',
                            numberType: 'float',
                            fontSize: 16
                        }}
                    />

                    <CurrencySelect isDisabled value={shop.currency?.abbreviation} />
                </SimpleGrid>
            </LabeledContent>

            {isWeightBased && (
                <AppSelect
                    label={t('CustomRateForm.weightUnit')}
                    isRequired
                    items={[{ name: "kg", value: "kg" }]}
                    selectProps={{
                        value: 'kg',
                        fontSize: 16,
                        isDisabled: true,
                    }}
                />
            )}

            <LabeledContent label={t('CustomRateForm.estimatedDelivery.label')} required>
                <SimpleGrid columns={2} gap={4}>
                    <AppInput
                        inputProps={{
                            value: value.estimatedDelivery?.minDays ?? '',
                            onChange: (e) => update({
                                estimatedDelivery: {
                                    minDays: Number(e.target.value),
                                    maxDays: value.estimatedDelivery?.maxDays,
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
                                    minDays: value.estimatedDelivery?.minDays,
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