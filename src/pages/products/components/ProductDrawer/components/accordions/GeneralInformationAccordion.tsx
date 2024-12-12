import React from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import ProductCollection from '../fields/ProductCollection'
import ProductDescription from '../fields/ProductDescription/ProductDescription'
import ProductImages from '../fields/ProductImages/ProductImages'
import ProductTitle from '../fields/ProductTitle'

function GeneralInformationAccordion() {
    return (
        <ProductFormAccordion
            label='General Information'
            defaultOpen
        >
            <ProductTitle />
            <ProductDescription />
            <ProductImages />
            <ProductCollection />
        </ProductFormAccordion>
    )
}

export default GeneralInformationAccordion