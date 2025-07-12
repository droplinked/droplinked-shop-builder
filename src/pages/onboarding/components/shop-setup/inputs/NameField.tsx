import { VStack } from '@chakra-ui/react'
import AppInput from 'components/redesign/input/AppInput'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'
import AiOptionsDisplay from '../ai/AiOptionsDisplay'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function NameField() {
    const { shopData, updateShopData, storeSetupErrors, setError } = useOnboardingStore()
    const { t } = useLocaleResources('onboarding')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        updateShopData('name', value)

        if (!value) {
            setError('name', t('shopSetup.inputs.name.validation.required'))
        } else if (value.length < 3) {
            setError('name', t('shopSetup.inputs.name.validation.minLength'))
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
                label={t('shopSetup.inputs.name.label')}
                inputProps={{
                    fontSize: { base: 14, md: 16 },
                    placeholder: t('shopSetup.inputs.name.placeholder'),
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
