import MessageBox from 'components/redesign/message-box/MessageBox'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import ProductAffiliate from '../fields/ProductAffiliate'
import ProductCollection from '../fields/ProductCollection'
import ProductDescription from '../fields/ProductDescription/ProductDescription'
import ProductImages from '../fields/ProductImages/ProductImages'
import ProductTitle from '../fields/ProductTitle/ProductTitle'
import GenerateWithAI from '../common/GenerateWithAI'

function GeneralInformationAccordion() {
    const { values: { product_type } } = useProductForm()

    return (
        <ProductFormAccordion
            label='General Information'
            defaultOpen={product_type !== "PRINT_ON_DEMAND"}
        >
            {product_type === "EVENT" && (
                <MessageBox
                    title='Event Sync Notice'
                    description='The event name and description are synced with your connected event account. To make updates, please edit directly in your event account. Changes will automatically appear here.'
                    theme='warning'
                />
            )}

            <ProductImages />

            <GenerateWithAI />

            <ProductTitle />
            <ProductDescription />
            <ProductCollection />
            <ProductAffiliate />
        </ProductFormAccordion>
    )
}

export default GeneralInformationAccordion