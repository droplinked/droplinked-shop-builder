import MessageBox from 'components/redesign/message-box/MessageBox'
import useProductForm from 'pages/products/hooks/useProductForm'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import ProductAffiliate from '../fields/ProductAffiliate'
import ProductCollection from '../fields/ProductCollection'
import ProductDescription from '../fields/ProductDescription/ProductDescription'
import ProductImages from '../fields/ProductImages/ProductImages'
import ProductTitle from '../fields/ProductTitle'
import GenerateWithAI from '../common/GenerateWithAI'

function GeneralInformationAccordion() {
    const { t } = useLocaleResources('products');
    const { values: { product_type } } = useProductForm()

    return (
        <ProductFormAccordion
            label={t('ProductForm.accordions.generalInformation.label')}
            defaultOpen={product_type !== "PRINT_ON_DEMAND"}
        >
            {product_type === "EVENT" && (
                <MessageBox
                    title={t('ProductForm.accordions.generalInformation.eventSync.title')}
                    description={t('ProductForm.accordions.generalInformation.eventSync.description')}
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