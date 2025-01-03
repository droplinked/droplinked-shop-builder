import AppIcons from 'assest/icon/Appicons'
import Input from 'components/redesign/input/Input'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useEffect, useState } from 'react'
import SwitchBox from '../../../common/SwitchBox'

function BulkPriceAdjuster() {
    const { values: { sku }, setFieldValue } = useProductForm()
    const [fixedPrice, setFixedPrice] = useState(false)
    const [inputValue, setInputValue] = useState<string | number>('')

    // Check if all SKUs have the same price on mount
    useEffect(function initializePricingState() {
        const allPrices = sku.map(item => item.price)
        const uniquePrices = new Set(allPrices)

        if (uniquePrices.size === 1) {
            setFixedPrice(true)
            setInputValue(allPrices[0])
        }
        else {
            setFixedPrice(false)
            setInputValue('')
        }
    }, [sku])

    function handleInputChange(value) {
        if (isNaN(value)) return
        setInputValue(value)
        const updatedSKUs = sku.map(item => ({ ...item, price: value }))
        setFieldValue("sku", updatedSKUs)
    }

    return (
        <SwitchBox
            title="Fixed Price"
            description="Apply a fixed price to all variants, overriding individual variant prices."
            isChecked={fixedPrice}
            onToggle={(e) => setFixedPrice(e.target.checked)}
            css={{ path: { stroke: "#7B7B7B" } }}
            rightContent={fixedPrice && (
                <Input
                    inputGroupProps={{ width: "104px" }}
                    inputProps={{
                        type: "number",
                        numberType: "float",
                        value: inputValue,
                        placeholder: "0.00",
                        onChange: (e) => handleInputChange(e.target.value)
                    }}
                    leftElement={<AppIcons.GrayDollar />}
                />
            )}
        />
    )
}

export default BulkPriceAdjuster