import React from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import ProductDrop from '../fields/ProductDrop'
import ProductRoyalty from '../fields/ProductRoyalty'

function Web3SettingsAccordion() {
    return (
        <ProductFormAccordion label='Web 3 settings'>
            <ProductDrop />
            <ProductRoyalty />
        </ProductFormAccordion>
    )
}

export default Web3SettingsAccordion