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
            title={t('shopSetup.inputs.autoPopulate.title')}
            description={t('shopSetup.inputs.autoPopulate.description')}
            isChecked={shopSetupUI.autoAddSampleProductsEnabled}
            onToggle={handleToggle}
            showBetaBadge
        />
    )
}

export default AutoPopulateSampleProductsToggle