import Input from 'components/redesign/input/Input'
import { useFormikContext } from 'formik'
import { ProductFormValues } from 'pages/products/utils/formSchema'
import React from 'react'
import ProductFormAccordion from './ProductFormAccordion'
import GenerateWithAI from './GenerateWithAI'

function GeneralInformationAccordion() {
    const { values, setFieldValue } = useFormikContext<ProductFormValues>()

    return (
        <ProductFormAccordion label='General Information'>
            <Input
                label='Product Name'
                description='Enter a unique product name. This will be visible to customers.'
                inputProps={{
                    value: values.title,
                    placeholder: "e.g., Handmade Ceramic Mug",
                    isRequired: true,
                    onChange: (e) => setFieldValue("title", e.target.value)
                }}
            />

        </ProductFormAccordion>
    )
}

export default GeneralInformationAccordion