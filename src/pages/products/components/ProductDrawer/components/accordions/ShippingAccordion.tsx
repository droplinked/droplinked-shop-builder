import React from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import ProductShippingType from '../fields/ProductShippingType/ProductShippingType'

function ShippingAccordion() {
    return (
        <ProductFormAccordion label='Shipping'>
            <ProductShippingType />
        </ProductFormAccordion>
    )
}

export default ShippingAccordion