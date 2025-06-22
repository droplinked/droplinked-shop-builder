import { Flex, useRadioGroup } from '@chakra-ui/react'
import { AILg } from 'assets/icons/AI'
import { ArrowrightMd } from 'assets/icons/Navigation/ArrowRight/ArrowrightMd'
import { ShopLg } from 'assets/icons/System/Shop/ShopLg'
import AppButton from 'components/redesign/button/AppButton'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import YesNoRadioCard from './YesNoRadioCard'

function ExistingWebsite() {
    const { updateOnboardingState, updateShopSetupUI, shopSetupUI } = useOnboardingStore()
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'selected-visibility-status',
        onChange: (value: string) => updateShopSetupUI('hasExistingShop', value === 'yes'),
        value: shopSetupUI.hasExistingShop ? 'yes' : 'no'
    })

    const options = [
        { value: 'yes', label: 'Yes', description: 'Import inventory and data over in just a few clicks.', icon: <ShopLg /> },
        { value: 'no', label: 'No', description: 'Create a storefront with the AI assistant.', icon: <AILg /> }
    ]

    return (
        <>
            <OnboardingStepHeader
                heading="Let's Get Started"
                description='Did you already have an existing website?'
            />

            <Flex
                flex={1}
                direction="column"
                gap={{ base: 4, xl: 6 }}
                {...getRootProps()}
            >
                {options.map((option) => (
                    <YesNoRadioCard
                        key={option.value}
                        {...option}
                        {...getRadioProps({ value: option.value })}
                    />
                ))}
            </Flex>

            <AppButton
                alignSelf='flex-end'
                rightIcon={<ArrowrightMd />}
                onClick={() => updateOnboardingState('currentStep', 'STORE_DETAILS')}
            >
                Continue
            </AppButton>
        </>
    )
}

export default ExistingWebsite