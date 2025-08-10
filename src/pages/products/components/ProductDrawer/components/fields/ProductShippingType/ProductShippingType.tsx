import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

function ProductShippingType() {
    const { t } = useLocaleResources('products')

    return (
        <FormFieldWrapper
            label={t('ProductShippingType.label')}
            description={t('ProductShippingType.description')}
            isRequired
        >

        </FormFieldWrapper>
    )
}

export default ProductShippingType