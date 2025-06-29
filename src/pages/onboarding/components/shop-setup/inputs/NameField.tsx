import { VStack } from '@chakra-ui/react'
import AppInput from 'components/redesign/input/AppInput'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'
import AiOptionsDisplay from '../ai/AiOptionsDisplay'

export default function NameField() {
    const { shopData, updateShopData, storeSetupErrors, setError } = useOnboardingStore()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        updateShopData('name', value)

        if (!value) {
            setError('name', 'Name is required')
        } else if (value.length < 3) {
            setError('name', 'Name must be at least 3 characters')
        } else {
            setError('name', undefined)
        }
    }

    const handleSelectName = (name: string) => {
        updateShopData('name', name)
        setError('name', undefined)
    }

    return (
        <VStack spacing={4} align="stretch">
            <AppInput
                label='Name'
                inputProps={{
                    fontSize: { base: 14, md: 16 },
                    placeholder: "Choose your store name",
                    value: shopData.name,
                    onChange: handleChange,
                    isRequired: true,
                }}
                {...storeSetupErrors.name && { message: storeSetupErrors.name, state: "error" }}
            />

            <AiOptionsDisplay
                type="names"
                title="AI Generated Names"
                onSelect={handleSelectName}
                selectedValue={shopData.name}
            />
        </VStack>
    )
}
