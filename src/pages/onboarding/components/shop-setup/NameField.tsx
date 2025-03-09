import Input from 'components/redesign/input/Input'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'

export default function NameField() {
    const { storeData, updateOnboardingState, errors, setError } = useOnboardingStore()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        updateOnboardingState('storeData', { ...storeData, name: value })

        if (!value) {
            setError('name', 'Name is required')
        } else if (value.length < 3) {
            setError('name', 'Name must be at least 3 characters')
        } else {
            setError('name', undefined)
        }
    }

    return (
        <Input
            label='Name'
            inputProps={{
                fontSize: { base: 14, md: 16 },
                placeholder: "Choose your store name",
                value: storeData.name,
                onChange: handleChange,
                isRequired: true,
            }}
            {...errors.name && { message: errors.name, state: "error" }}
        />
    )
}
