import Textarea from 'components/redesign/textarea/Textarea'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function DescriptionField() {
    const { shopData, updateShopData, storeSetupErrors } = useOnboardingStore()
    const { t } = useLocaleResources('onboarding')

    const textAreaPlaceholder = t('shopSetup.inputs.description.placeholder')
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        updateShopData('description', value)
    }

    return (
        <Textarea
            borderRadius={8}
            fontSize={{ base: 14, md: 16 }}
            placeholder={textAreaPlaceholder}
            tooltipText={textAreaPlaceholder}
            label={t('shopSetup.inputs.description.label')}
            spellCheck="false"
            value={shopData.description}
            onChange={handleChange}
            {...storeSetupErrors.description && { message: storeSetupErrors.description, state: "error" }}
        />
    )
}
