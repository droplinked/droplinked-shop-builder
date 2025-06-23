import SwitchBox from 'components/redesign/switch-box/SwitchBox'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'

function AutoPopulateSampleProductsToggle() {
    const { shopSetupUI, updateShopSetupUI } = useOnboardingStore()

    const handleToggle = () => {
        updateShopSetupUI('autoAddSampleProductsEnabled', !shopSetupUI.autoAddSampleProductsEnabled)
    }

    return (
        <SwitchBox
            title="Create Inspirational Inventory"
            description="Grant our AI creative engine to add 3 merch on demand products based on the assets you've uploaded to easily get started."
            isChecked={shopSetupUI.autoAddSampleProductsEnabled}
            onToggle={handleToggle}
            showBetaBadge
        />
    )
}

export default AutoPopulateSampleProductsToggle