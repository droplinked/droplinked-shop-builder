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

            <ProductDeliveryMessage />
            <ProductTermsAndConditions />
        </ProductFormAccordion>
    )
}

export default AdditionalDetailsAccordion