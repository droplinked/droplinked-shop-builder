import AppIcons from 'assest/icon/Appicons'
import Input from 'components/redesign/input/Input'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import SwitchBox from '../common/SwitchBox'

function ProductAffiliate() {
    const { values, setFieldValue } = useProductForm()

    const preventInvalidKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const invalidKeys = ['+', '-', 'e']
        if (invalidKeys.includes(e.key)) e.preventDefault()
    }

    const handleCommissionChange = ({ target: { value, validity } }) => {
        if (!validity.valid) return
        const parsedValue = parseInt(value)
        setFieldValue('commission', isNaN(parsedValue) ? 0 : parsedValue)
    }

    return (
        <SwitchBox
            title='Affiliate Market'
            description='Enable this to allow co-sellers to import and sell this product.'
            isChecked={values.canBeAffiliated}
            onToggle={(e) => setFieldValue("canBeAffiliated", e.target.checked)}
            rightContent={
                <Input
                    inputGroupProps={{ width: "88px" }}
                    inputProps={{
                        type: "number",
                        min: 1,
                        max: 99,
                        placeholder: "100",
                        value: values.commission,
                        onKeyDown: preventInvalidKeys,
                        onChange: handleCommissionChange
                    }}
                    rightElement={<AppIcons.GrayPercent />}
                />
            }
        />
    )
}

export default ProductAffiliate