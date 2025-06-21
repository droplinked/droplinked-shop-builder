import { Flex, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import useAppStore from 'stores/app/appStore'
import { useShopSetupSubmit } from '../../hooks/useShopSetupSubmit'
import ControlButtons from '../common/ControlButtons'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import ShopPreview from '../shop-preview/ShopPreview'
// import AiAssistant from './AiAssistant/desktop/AiAssistant'
import AiAssistantButton from './AiAssistant/mobile/AiAssistantButton'
import AutoPopulateSampleProductsToggle from './AutoPopulateSampleProductsToggle'
import CoverImage from './CoverImage'
import DescriptionField from './DescriptionField'
import ExistingShopUrlProcessor from './ExistingShopUrlProcessor'
import LogoUploader from './LogoUploader'
import NameField from './NameField'
import UrlChooser from './UrlChooser'

function ShopSetupForm() {
    const [isSmallerThan1024] = useMediaQuery("(max-width: 1024px)")
    const { reset } = useAppStore()
    const { handleSubmit, isLoading, resetOnboarding } = useShopSetupSubmit()

    const handleBack = () => {
        reset()
        resetOnboarding()
    }

    return (
        <>
            <Flex flexDirection={{ base: "column", md: "row" }} justifyContent="space-between" gap={4}>
                <OnboardingStepHeader heading='Account Details' description='Complete the information below to optimize your storefront.' />
                {isSmallerThan1024 && <AiAssistantButton />}
            </Flex>
            <ExistingShopUrlProcessor />
            <LogoUploader />
            <CoverImage />
            <UrlChooser />
            <NameField />
            <DescriptionField />
            <AutoPopulateSampleProductsToggle />
            <ControlButtons onBack={handleBack} onSubmit={handleSubmit} isLoading={isLoading} backText='Exit' />
            {/* {!isSmallerThan1024 && <AiAssistant />} */}
            {isSmallerThan1024 && <ShopPreview />}
        </>
    )
}

export default ShopSetupForm