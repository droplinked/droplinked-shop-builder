import Textarea from 'components/redesign/textarea/Textarea'
import { useFormikContext } from 'formik'
import useStoreCreation from 'pages/onboarding/store/useStoreCreation'
import React from 'react'
import { SetupFormValues } from './formConfig'

export default function DescriptionField() {
    const { values, setFieldValue, errors } = useFormikContext<SetupFormValues>()
    const { updateStoreField } = useStoreCreation()
    const textAreaPlaceholder = "Write a 150 to 160 characters description for your shop. This will be visible in the footer and will be used for SEO purposes."

    const handleChange = (e) => {
        const value = e.target.value
        setFieldValue('description', value)
        updateStoreField('description', value)
    }

    return (
        <Textarea
            borderRadius={8}
            fontSize={{ base: 14, md: 16 }}
            placeholder={textAreaPlaceholder}
            tooltipText={textAreaPlaceholder}
            label='Description'
            value={values.description}
            onChange={handleChange}
            {...errors.description && { message: errors.description, state: "error" }}
        />
    )
}
