import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useState } from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import ProductDrop from '../fields/ProductDrop/ProductDrop'
import ProductRoyalty from '../fields/ProductRoyalty'

function Web3SettingsAccordion() {
    const { values: { digitalDetail, nftData } } = useProductForm()
    const [isDropEnabled, setIsDropEnabled] = useState(!!(digitalDetail?.chain || nftData?.networkName))

    function handleDropToggle(checked: boolean) {
        setIsDropEnabled(checked)
    }

    return (
        <ProductFormAccordion label="Web 3 settings">
            <ProductDrop
                isDropEnabled={isDropEnabled}
                onToggleDrop={handleDropToggle}
            />
            {isDropEnabled && <ProductRoyalty />}
        </ProductFormAccordion>
    )
}

export default Web3SettingsAccordion