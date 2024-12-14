import React from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import ProductShippingMethod from '../fields/ProductShippingMethod/ProductShippingMethod'

function ShippingAccordion() {
    return (
        <ProductFormAccordion label='Shipping'>
            <ProductShippingMethod />
        </ProductFormAccordion>
    )
}

export default ShippingAccordion