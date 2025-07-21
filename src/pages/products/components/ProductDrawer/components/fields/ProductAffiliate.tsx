import AppIcons from 'assets/icon/Appicons'
import AppInput from 'components/redesign/input/AppInput'
import useProductForm from 'pages/products/hooks/useProductForm'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { ChangeEvent } from 'react'
import SwitchBox from '../common/SwitchBox'

function ProductAffiliate() {
    const { t } = useLocaleResources('products');
    const { values, setFieldValue, errors } = useProductForm()

    function handleToggle(checked: boolean) {
        setFieldValue('canBeAffiliated', checked)
        if (!checked) setFieldValue('commission', 0)
    }

    function handleCommissionChange(event: ChangeEvent<HTMLInputElement>) {
        const { value, validity } = event.target
        if (!validity.valid) return

        const parsedValue = parseFloat(value)
        setFieldValue('commission', isNaN(parsedValue) ? 0 : parsedValue)
    }

    return (
        <SwitchBox
            title={t('ProductAffiliate.title')}
            description={t('ProductAffiliate.description')}
            switchProps={{
                isChecked: values.canBeAffiliated,
                onChange: (event) => handleToggle(event.target.checked)
            }}
            {...(values.canBeAffiliated && {
                rightContent: (
                    <AppInput
                        inputGroupProps={{ width: '88px' }}
                        inputProps={{
                            type: 'number',
                            numberType: 'float',
                            min: 0,
                            max: 99.99,
                            step: 0.01,
                            placeholder: t('ProductAffiliate.commissionPlaceholder'),
                            value: values.commission,
                            onChange: handleCommissionChange
                        }}
                        rightElement={<AppIcons.GrayPercent />}
                    />
                )
            })}
            errorMessage={errors.commission}
        />
    )
}

export default ProductAffiliate