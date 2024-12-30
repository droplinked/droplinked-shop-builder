import React, { useState } from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import SwitchBox from '../common/SwitchBox'
import ProductDeliveryMessage from '../fields/ProductDeliveryMessage'
import ProductKeywords from '../fields/ProductKeywords'
import ProductReleaseDate from '../fields/ProductReleaseDate'
import ProductTermsAndConditions from '../fields/ProductTermsAndConditions'
import ProductVisibilityStatus from '../fields/ProductVisibilityStatus'

function AdditionalDetailsAccordion() {
    const [customField, setCustomField] = useState(false)
    const [discountAllowance, setDiscountAllowance] = useState(false)

    return (
        <ProductFormAccordion label='Additional Details'>
            <ProductVisibilityStatus />
            <ProductKeywords />
            <ProductReleaseDate />

            <SwitchBox
                title='Custom Field'
                description='Add custom information to display during checkout.'
                isChecked={customField}
                onToggle={() => setCustomField(prev => !prev)}
            />

            <SwitchBox
                title='Discount Allowance'
                description='Allow customers to apply discount codes for this product during checkout.'
                isChecked={discountAllowance}
                onToggle={() => setDiscountAllowance(prev => !prev)}
            />

            <ProductDeliveryMessage />
            <ProductTermsAndConditions />
        </ProductFormAccordion>
    )
}

export default AdditionalDetailsAccordion