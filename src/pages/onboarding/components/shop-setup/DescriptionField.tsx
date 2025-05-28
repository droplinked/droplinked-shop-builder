import Textarea from 'components/redesign/textarea/Textarea'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/onboarding/ar.json'
import enLocale from 'locales/onboarding/en.json'

export default function DescriptionField() {
    const { storeSetup, updateOnboardingState, storeSetupErrors } = useOnboardingStore()
    const { t } = useLocaleResources('onboarding', {
        en: enLocale,
        ar: arLocale
    })

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        updateOnboardingState('storeSetup', { ...storeSetup, description: value })
    }

    return (
        <Textarea
            borderRadius={8}
            fontSize={{ base: 14, md: 16 }}
            placeholder={t('shopSetup.descriptionPlaceholder')}
            tooltipText={t('shopSetup.descriptionTooltip')}
            label={t('common.shop.description')}
            spellCheck="false"
            value={storeSetup.description}
            onChange={handleChange}
            {...storeSetupErrors.description && { message: storeSetupErrors.description, state: "error" }}
        />
    )
}
