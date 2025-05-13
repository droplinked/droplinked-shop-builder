import AppInput from 'components/redesign/input/AppInput'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useEffect, useState } from 'react'
import InfinityToggleButton from '../../../common/InfinityToggleButton'
import SwitchBox from '../../../common/SwitchBox'

function ProductBulkQuantityUpdater() {
    const { values: { sku }, setFieldValue } = useProductForm()
    const [fixedQuantity, setFixedQuantity] = useState(false)
    const [inputValue, setInputValue] = useState<string | number>('')
    const [isInfinite, setIsInfinite] = useState(false)

    // Check if all SKUs have the same quantity on mount
    useEffect(function initializeQuantityState() {
        const allQuantities = sku.map(item => item.quantity)
        const uniqueQuantities = new Set(allQuantities)

        if (uniqueQuantities.size === 1) {
            setFixedQuantity(true)
            setInputValue(allQuantities[0])
            setIsInfinite(allQuantities[0] === 1000000)
        }
        else {
            setFixedQuantity(false)
            setInputValue('')
            setIsInfinite(false)
        }
    }, [sku])

    function handleInputChange(value) {
        if (isNaN(value)) return
        setInputValue(value)
        setIsInfinite(value === 1000000) // Sync the toggle state with the input
        const updatedSKUs = sku.map(item => ({ ...item, quantity: value }))
        setFieldValue("sku", updatedSKUs)
    }

    function handleToggleInfinite() {
        const newValue = isInfinite ? '' : 1000000
        handleInputChange(newValue)
    }

    return (
        <SwitchBox
            title="Fixed Quantity"
            description="Apply a fixed quantity to all variants, overriding individual variant quantities."
            switchProps={{
                isChecked: fixedQuantity,
                onChange: () => setFixedQuantity(prev => !prev)
            }}
            rightContent={fixedQuantity && (
                <AppInput
                    inputGroupProps={{ width: "104px" }}
                    inputContainerProps={{ padding: '8px', pl: 4 }}
                    inputProps={{
                        type: "number",
                        numberType: "float",
                        value: inputValue,
                        placeholder: "1",
                        onChange: (e) => handleInputChange(+e.target.value)
                    }}
                    rightElement={(
                        <InfinityToggleButton
                            isActive={isInfinite}
                            onToggle={handleToggleInfinite}
                        />
                    )}
                />
            )}
        />
    )
}

export default ProductBulkQuantityUpdater