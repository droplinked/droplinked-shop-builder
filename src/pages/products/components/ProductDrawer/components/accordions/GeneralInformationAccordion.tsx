import React from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import ProductDescription from '../fields/ProductDescription/ProductDescription'
import ProductTitle from '../fields/ProductTitle'
import ProductImages from '../fields/ProductImages/ProductImages'

function GeneralInformationAccordion() {
    return (
        <ProductFormAccordion label='General Information'>
            <ProductTitle />
            <ProductDescription />
            <ProductImages />
        </ProductFormAccordion>
    )
}

export default GeneralInformationAccordion