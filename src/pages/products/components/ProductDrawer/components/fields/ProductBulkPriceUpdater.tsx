import CurrencyIcon from 'components/redesign/currency-icon/CurrencyIcon'
import AppInput from 'components/redesign/input/AppInput'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useEffect, useState } from 'react'
import SwitchBox from '../common/SwitchBox'

function ProductBulkPriceUpdater() {
    const { t } = useLocaleResources('products');
    const { values: { sku }, setFieldValue } = useProductForm()
    const [fixedPrice, setFixedPrice] = useState(false)
    const [inputValue, setInputValue] = useState<string | number>('')

    // Check if all SKUs have the same price on mount
    useEffect(() => {
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

    function handleInputChange(value: number) {
        setInputValue(value)
        const updatedSKUs = sku.map(item => ({ ...item, price: value }))
        setFieldValue("sku", updatedSKUs)
    }

    return (
        <SwitchBox
            title={t('fields.bulkPriceUpdater.title')}
            description={t('fields.bulkPriceUpdater.description')}
            switchProps={{
                isChecked: fixedPrice,
                onChange: (e) => setFixedPrice(e.target.checked)
            }}
            rightContent={fixedPrice && (
                <AppInput
                    inputGroupProps={{ width: "104px" }}
                    inputProps={{
                        type: "number",
                        numberType: "float",
                        value: inputValue,
                        placeholder: t('fields.bulkPriceUpdater.placeholder'),
                        onChange: (e) => handleInputChange((parseFloat(e.target.value)))
                    }}
                    leftElement={<CurrencyIcon />}
                />
            )}
        />
    )
}

export default ProductBulkPriceUpdater