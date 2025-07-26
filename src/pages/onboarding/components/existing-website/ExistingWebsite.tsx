import { Flex, useDisclosure, useRadioGroup } from '@chakra-ui/react'
import { AILg } from 'assets/icons/AI'
import { ArrowleftMd } from 'assets/icons/Navigation/ArrowLeft/ArrowleftMd'
import { ArrowrightMd } from 'assets/icons/Navigation/ArrowRight/ArrowrightMd'
import { ShopLg } from 'assets/icons/System/Shop/ShopLg'
import ProTrialModal from 'components/modals/pro-plan-upgrade-modal/ProPlanUpgradeModal'
import AppButton from 'components/redesign/button/AppButton'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React, { useEffect } from 'react'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import YesNoRadioCard from './YesNoRadioCard'

function ExistingWebsite() {
    const { updateOnboardingState, updateShopSetupUI, shopSetupUI } = useOnboardingStore()
    const { isOpen: isProTrialModalOpen, onOpen: openProTrialModal, onClose: closeProTrialModal } = useDisclosure()
    const { t, isRTL } = useLocaleResources('onboarding')

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'selected-visibility-status',
        onChange: (value: string) => updateShopSetupUI('hasExistingShop', value === 'yes'),
        value: shopSetupUI.hasExistingShop ? 'yes' : 'no'
    })

    // If user came from Crossmint landing page, open the pro trial modal
    useEffect(() => {
        if (shopSetupUI.isFromCrossmint) openProTrialModal()
    }, [openProTrialModal])

    const options = [
        { value: 'yes', label: t('ExistingWebsite.options.yes.label'), description: t('ExistingWebsite.options.yes.description'), icon: <ShopLg /> },
        { value: 'no', label: t('ExistingWebsite.options.no.label'), description: t('ExistingWebsite.options.no.description'), icon: <AILg /> }
    ]

    return (
        <>
            <OnboardingStepHeader
                heading={t('ExistingWebsite.title')}
                description={t('ExistingWebsite.description')}
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
                rightIcon={isRTL ? <ArrowleftMd /> : <ArrowrightMd />}
                onClick={() => updateOnboardingState('currentStep', 'STORE_DETAILS')}
            >
                {t('common:continue')}
            </AppButton>

            <ProTrialModal
                isOpen={isProTrialModalOpen}
                onClose={closeProTrialModal}
            />
        </>
    )
}

export default ExistingWebsite