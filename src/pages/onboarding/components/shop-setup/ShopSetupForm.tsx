import { Flex } from '@chakra-ui/react'
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
import { validateStoreData } from './formValidation'

function ShopSetupForm({ onBack, onNext }: OnboardingStepProps) {
    const { updateOnboardingState, storeSetup, setError } = useOnboardingStore()

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
            <LogoUploader />
            <CoverImage />
            <UrlChooser />
            <NameField />
            <DescriptionField />
            <ControlButtons onBack={handleBack} onSubmit={handleSubmit} />
            <AiAssistant />
        </Flex>
    )
}

export default ShopSetupForm