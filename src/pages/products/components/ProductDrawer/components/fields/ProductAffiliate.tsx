import AppIcons from 'assest/icon/Appicons'
import Input from 'components/redesign/input/Input'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { ChangeEvent } from 'react'
import SwitchBox from '../common/SwitchBox'

function ProductAffiliate() {
    const { values, setFieldValue, errors } = useProductForm()

    const handleCommissionChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, validity } = e.target
        if (!validity.valid) return

        const parsedValue = parseFloat(value)
        setFieldValue('commission', isNaN(parsedValue) ? null : parsedValue)
    }

    return (
        <SwitchBox
            title='Affiliate Market'
            description='Enable this to allow co-sellers to import and sell this product.'
            switchProps={{
                isChecked: values.canBeAffiliated,
                onChange: (e) => setFieldValue("canBeAffiliated", e.target.checked)
            }}
            rightContent={
                <Input
                    inputGroupProps={{ width: "88px" }}
                    inputProps={{
                        type: 'number',
                        numberType: 'float',
                        min: 0,
                        max: 99.99,
                        step: 0.01,
                        placeholder: '15',
                        value: values.commission,
                        onChange: handleCommissionChange
                    }}
                    rightElement={<AppIcons.GrayPercent />}
                />
            }
            errorMessage={errors.commission}
        />
    )
}

export default ProductAffiliate