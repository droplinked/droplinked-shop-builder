import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useProductForm from 'pages/products/hooks/useProductForm'
import { checkIfProductIsRecorded } from 'pages/products/utils/skuUtils'
import React, { useState } from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import ProductDrop from '../fields/ProductDrop/ProductDrop'
import ProductRoyalty from '../fields/ProductRoyalty'

function Web3SettingsAccordion() {
    const { t } = useLocaleResources('products')
    const { values: { digitalDetail, nftData, sku } } = useProductForm()
    const isProductRecorded = checkIfProductIsRecorded(sku)

    const initialDropEnabledState = isProductRecorded || Boolean(digitalDetail?.chain || nftData?.networkName)
    const [isDropEnabled, setDropEnabled] = useState(initialDropEnabledState)

    function toggleDrop(checked: boolean) {
        if (isProductRecorded) return
        setDropEnabled(checked)
    }

    return (
        <ProductFormAccordion label={t('ProductForm.accordions.web3Settings.label')}>
            <ProductDrop
                isProductRecorded={isProductRecorded}
                isDropEnabled={isDropEnabled}
                onToggleDrop={toggleDrop}
            />
            {isDropEnabled && <ProductRoyalty />}
        </ProductFormAccordion>
    )
}

export default Web3SettingsAccordion