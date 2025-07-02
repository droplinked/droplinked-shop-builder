import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import PODDesignMaker from './PODDesignMaker'

function PODProductTemplate() {
    const { t } = useLocaleResources('products');
    const { values: { pod_blank_product_id } } = useProductForm()

    if (!pod_blank_product_id) return null

    return (
        <FormFieldWrapper
            label={t('fields.pod.productTemplate.label')}
            description={t('fields.pod.productTemplate.description')}
            isRequired
        >
            <PODDesignMaker />
        </FormFieldWrapper>
    )
}

export default PODProductTemplate