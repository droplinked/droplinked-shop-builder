import { Flex } from '@chakra-ui/react'
import useOnboardingStore, { initialStoreData } from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'
import ControlButtons from '../common/ControlButtons'
import AiAssistant from './AiAssistant/desktop/AiAssistant'
import CoverImage from './CoverImage'
import DescriptionField from './DescriptionField'
import LogoUploader from './LogoUploader'
import NameField from './NameField'
import UrlChooser from './UrlChooser'
import { validateStoreData } from './formValidation'

function ShopSetupForm({ onBack, onNext }) {
    const { updateOnboardingState, storeData, setError } = useOnboardingStore()

    const handleSubmit = () => {
        if (validateStoreData(storeData, setError)) {
            console.log("Form submitted with values:", storeData)
            onNext()
        }
    }

    const handleBack = () => {
        alert("form resetted")
        updateOnboardingState("storeData", initialStoreData)
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