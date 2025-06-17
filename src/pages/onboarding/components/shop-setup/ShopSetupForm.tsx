import { Flex, useMediaQuery } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import useAppStore from 'stores/app/appStore'
import { useShopSetupSubmit } from '../../hooks/useShopSetupSubmit'
import ControlButtons from '../common/ControlButtons'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import ShopPreview from '../shop-preview/ShopPreview'
import AiAssistant from './AiAssistant/desktop/AiAssistant'
import AiAssistantButton from './AiAssistant/mobile/AiAssistantButton'
import CoverImage from './CoverImage'
import DescriptionField from './DescriptionField'
import LogoUploader from './LogoUploader'
import NameField from './NameField'
import UrlChooser from './UrlChooser'

function ShopSetupForm() {
    const [isSmallerThan1024] = useMediaQuery("(max-width: 1024px)")
    const { reset } = useAppStore()
    const { handleSubmit, isLoading, resetOnboarding } = useShopSetupSubmit()
    const { t } = useLocaleResources('onboarding')

    const handleBack = () => {
        reset()
        resetOnboarding()
    }

    return (
        <>
            <Flex flexDirection={{ base: "column", md: "row" }} justifyContent="space-between" gap={4}>
                <OnboardingStepHeader 
                    heading={t('common.shop.details')} 
                    description={t('shopSetup.subtitle')} 
                />
                {isSmallerThan1024 && <AiAssistantButton />}
            </Flex>
            <LogoUploader />
            <CoverImage />
            <UrlChooser />
            <NameField />
            <DescriptionField />
            <ControlButtons 
                onBack={handleBack} 
                onSubmit={handleSubmit} 
                isLoading={isLoading} 
                backText={t('common.buttons.exit')} 
            />
            {!isSmallerThan1024 && <AiAssistant />}
            {isSmallerThan1024 && <ShopPreview />}
        </>
    )
}

export default ShopSetupForm