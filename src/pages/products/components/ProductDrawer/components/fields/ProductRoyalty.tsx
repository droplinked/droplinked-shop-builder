import AppIcons from 'assest/icon/Appicons'
import Input from 'components/redesign/input/Input'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useEffect, useState } from 'react'
import SwitchBox from '../common/SwitchBox'

export default function ProductRoyalty() {
    const [showInput, setShowInput] = useState(false)

    return (
        <SwitchBox
            title="Royalty"
            description="Activate royalties on this product to receive a percentage on each resale."
            isChecked={showInput}
            onToggle={(e) => setShowInput(e.target.checked)}
            {...(showInput && { rightContent: <RoyaltyInput /> })}
        />
    )
}

function RoyaltyInput() {
    const { values: { sku }, setFieldValue } = useProductForm()
    const [royalty, setRoyalty] = useState(sku?.[0]?.royalty ?? null)

    function preventInvalidKeys(e) {
        const invalidKeys = ['+', '-', 'e']
        if (invalidKeys.includes(e.key)) e.preventDefault()
    }

    function handleInputChange(e) {
        const { value, validity } = e.target
        if (!validity.valid) return

        const numericValue = value === '' ? null : parseFloat(value)
        setRoyalty(numericValue)

        const updatedSkus = sku.map(item => ({ ...item, royalty: numericValue }))
        setFieldValue('sku', updatedSkus)
    }

    useEffect(() => {
        return () => {
            const updatedSkus = sku.map(item => ({ ...item, royalty: null }))
            setFieldValue('sku', updatedSkus)
        }
    }, [sku, setFieldValue])

    return (
        <Input
            inputGroupProps={{ width: '104px' }}
            inputProps={{
                type: 'number',
                min: 0,
                max: 99.99,
                step: 0.01,
                placeholder: '15',
                value: royalty !== null ? royalty : '',
                pattern: '^[0-9]*\\.?[0-9]*$',
                onKeyDown: preventInvalidKeys,
                onChange: handleInputChange
            }}
            rightElement={<AppIcons.GrayPercent />}
        />
    )
}