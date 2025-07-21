import SwitchBox from 'components/redesign/switch-box/SwitchBox'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

function AutoPopulateSampleProductsToggle() {
    const { shopSetupUI, updateShopSetupUI } = useOnboardingStore()
    const { t } = useLocaleResources('onboarding')

    const handleToggle = () => {
        updateShopSetupUI('autoAddSampleProductsEnabled', !shopSetupUI.autoAddSampleProductsEnabled)
    }

    return (
        <SwitchBox
            title={t('AutoPopulateSampleProductsToggle.title')}
            description={t('AutoPopulateSampleProductsToggle.description')}
            isChecked={shopSetupUI.autoAddSampleProductsEnabled}
            onToggle={handleToggle}
            showBetaBadge
        />
    )
}

export default AutoPopulateSampleProductsToggle