import AppInput from 'components/redesign/input/AppInput'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/onboarding/ar.json'
import enLocale from 'locales/onboarding/en.json'

export default function NameField() {
    const { storeSetup, updateOnboardingState, storeSetupErrors, setError } = useOnboardingStore()
    const { t } = useLocaleResources('onboarding', {
        en: enLocale,
        ar: arLocale
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        updateOnboardingState('storeSetup', { ...storeSetup, name: value })

        if (!value) {
            setError('name', t('common.validation.nameRequired'))
        } else if (value.length < 3) {
            setError('name', t('common.validation.nameLength'))
        } else {
            setError('name', undefined)
        }
    }

    return (
        <AppInput
            label={t('common.shop.name')}
            inputProps={{
                fontSize: { base: 14, md: 16 },
                placeholder: t('shopSetup.namePlaceholder'),
                value: storeSetup.name,
                onChange: handleChange,
                isRequired: true,
            }}
            {...storeSetupErrors.name && { message: storeSetupErrors.name, state: "error" }}
        />
    )
}
