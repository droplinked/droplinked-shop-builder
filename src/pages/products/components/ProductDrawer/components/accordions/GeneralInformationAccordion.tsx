import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import ProductAffiliate from '../fields/ProductAffiliate'
import ProductCollection from '../fields/ProductCollection'
import ProductDescription from '../fields/ProductDescription/ProductDescription'
import ProductImages from '../fields/ProductImages/ProductImages'
import ProductTitle from '../fields/ProductTitle'

function GeneralInformationAccordion() {
    const { values: { product_type } } = useProductForm()

    return (
        <ProductFormAccordion
            label='General Information'
            defaultOpen={product_type !== "PRINT_ON_DEMAND"}
        >
            <ProductTitle />
            <ProductDescription />
            <ProductImages />
            <ProductCollection />
            <ProductAffiliate />
        </ProductFormAccordion>
    )
}

export default GeneralInformationAccordion