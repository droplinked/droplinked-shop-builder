import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import ProductShippingType from '../fields/ProductShippingType/ProductShippingType'

function ShippingAccordion() {
    const { t } = useLocaleResources('products');
    
    return (
        <ProductFormAccordion label={t('ProductForm.accordions.shipping.label')}>
            <ProductShippingType />
        </ProductFormAccordion>
    )
}

export default ShippingAccordion