import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import SwitchBox from '../common/SwitchBox'
import ProductDeliveryMessage from '../fields/ProductDeliveryMessage'
import ProductKeywords from '../fields/ProductKeywords'
import ProductReleaseDate from '../fields/ProductReleaseDate'
import ProductVisibilityStatus from '../fields/ProductVisibilityStatus'

function AdditionalDetailsAccordion() {
    const { values: { pre_purchase_data_fetch, product_type }, setFieldValue } = useProductForm()

    return (
        <ProductFormAccordion label="Additional Details">
            <ProductVisibilityStatus />
            <ProductKeywords />
            <ProductReleaseDate />

            <SwitchBox
                title="Custom Field"
                description="Add custom information to display during checkout."
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