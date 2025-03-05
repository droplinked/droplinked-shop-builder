import Input from 'components/redesign/input/Input'
import { useFormikContext } from 'formik'
import React from 'react'
import { SetupFormValues } from './formConfig'
import useStoreCreation from 'pages/onboarding/store/useStoreCreation'

export default function NameField() {
    const { values, setFieldValue, errors } = useFormikContext<SetupFormValues>()
    const { updateStoreField } = useStoreCreation()

    const handleChange = (e) => {
        const value = e.target.value
        setFieldValue('name', value)
        updateStoreField('name', value)
    }

    return (
        <Input
            label='Name'
            inputProps={{
                fontSize: { base: 14, md: 16 },
                placeholder: "Choose your store name",
                value: values.name,
                onChange: handleChange,
                isRequired: true,
            }}
            {...errors.name && { message: errors.name, state: "error" }}
        />
    )
}
