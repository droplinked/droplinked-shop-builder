import KeywordInput from 'components/redesign/keyword-input/KeywordInput'
import useProductForm from 'pages/products/hooks/useProductForm'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import SwitchBox from '../common/SwitchBox'
import ProductDeliveryMessage from '../fields/ProductDeliveryMessage'
import ProductReleaseDate from '../fields/ProductReleaseDate'
import ProductVisibilityStatus from '../fields/ProductVisibilityStatus'

function AdditionalDetailsAccordion() {
    const { t } = useLocaleResources('products');
    const { values: { tags, pre_purchase_data_fetch, product_type }, setFieldValue } = useProductForm()

    return (
        <ProductFormAccordion label={t('accordions.additionalDetails.label')}>
            <ProductVisibilityStatus />
            <KeywordInput
                keywords={tags}
                onKeywordsChange={(keywords) => setFieldValue('tags', keywords)}
                placeholder={t('accordions.additionalDetails.keywordsPlaceholder')}
            />
            <ProductReleaseDate />

            <SwitchBox
                title={t('accordions.additionalDetails.customField.title')}
                description={t('accordions.additionalDetails.customField.description')}
                switchProps={{
                    isChecked: pre_purchase_data_fetch,
                    onChange: () => setFieldValue("pre_purchase_data_fetch", !pre_purchase_data_fetch)
                }}
            />

            {product_type === "DIGITAL" && <ProductDeliveryMessage />}
            {/* <ProductTermsAndConditions /> */}
        </ProductFormAccordion>
    )
}

export default AdditionalDetailsAccordion