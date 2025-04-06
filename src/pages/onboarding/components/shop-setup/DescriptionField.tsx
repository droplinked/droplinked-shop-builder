import Textarea from 'components/redesign/textarea/Textarea'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'

export default function DescriptionField() {
    const { storeSetup, updateOnboardingState, storeSetupErrors, setError } = useOnboardingStore()
    const textAreaPlaceholder = "Write a 150 to 160 characters description for your shop. This will be visible in the footer and will be used for SEO purposes."

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        updateOnboardingState('storeSetup', { ...storeSetup, description: value })

        if (!value) {
            setError('description', 'Description is required')
        } else if (value.length < 150) {
            setError('description', 'Description must be at least 150 characters')
        } else if (value.length > 160) {
            setError('description', 'Description must not exceed 160 characters')
        } else {
            setError('description', undefined)
        }
    }

    return (
        <Textarea
            borderRadius={8}
            fontSize={{ base: 14, md: 16 }}
            placeholder={textAreaPlaceholder}
            tooltipText={textAreaPlaceholder}
            label='Description'
            value={storeSetup.description}
            onChange={handleChange}
            {...storeSetupErrors.description && { message: storeSetupErrors.description, state: "error" }}
        />
    )
}
