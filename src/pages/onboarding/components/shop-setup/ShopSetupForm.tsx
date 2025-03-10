import { Flex, useMediaQuery } from '@chakra-ui/react'
import useOnboardingStore, { initialStoreSetup } from 'pages/onboarding/stores/useOnboardingStore'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import React from 'react'
import ControlButtons from '../common/ControlButtons'
import AiAssistant from './AiAssistant/desktop/AiAssistant'
import CoverImage from './CoverImage'
import DescriptionField from './DescriptionField'
import LogoUploader from './LogoUploader'
import NameField from './NameField'
import UrlChooser from './UrlChooser'
import { validateStoreData } from '../../utils/shopSetupFormValidation'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import AiAssistantButton from './AiAssistant/mobile/AiAssistantButton'

function ShopSetupForm({ onBack, onNext }: OnboardingStepProps) {
    const { updateOnboardingState, storeSetup, setError } = useOnboardingStore()
    const [isSmallerThan1024] = useMediaQuery("(max-width: 1024px)")

    const handleSubmit = () => {
        if (validateStoreData(storeSetup, setError)) {
            console.log("Form submitted with values:", storeSetup)
            onNext()
        }
    }

    const handleBack = () => {
        alert("form resetted")
        updateOnboardingState("storeSetup", initialStoreSetup)
        onBack()
    }

    return (
        <Flex gap={9} direction="column">
            <Flex flexDirection={{ base: "column", md: "row" }} justifyContent="space-between" gap={4}>
                <OnboardingStepHeader heading='Store Details' description='Complete the information below to optimize your storefront.' />
                {isSmallerThan1024 && <AiAssistantButton />}
            </Flex>
            <LogoUploader />
            <CoverImage />
            <UrlChooser />
            <NameField />
            <DescriptionField />
            <ControlButtons onBack={handleBack} onSubmit={handleSubmit} />
            {!isSmallerThan1024 && <AiAssistant />}
        </Flex>
    )
}

export default ShopSetupForm