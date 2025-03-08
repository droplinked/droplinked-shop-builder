import { Flex } from '@chakra-ui/react'
import useOnboardingStore, { initialStoreData } from 'pages/onboarding/store/useOnboardingStore'
import React from 'react'
import StepWrapper from '../StepWrapper'
import ControlButtons from './ControlButtons'
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
            console.log("Form submitted with values:", storeData);
            onNext();
        }
    }

    const handleBack = () => {
        alert("form resetted")
        updateOnboardingState("storeData", initialStoreData)
        onBack()
    }

    return (
        <StepWrapper
            heading='Store details'
            description='Complete the information below to optimize your storefront.'
        >
            <Flex gap={9} direction="column">
                <LogoUploader />
                <CoverImage />
                <UrlChooser />
                <NameField />
                <DescriptionField />
                <ControlButtons onBack={handleBack} onSubmit={handleSubmit} />
            </Flex>
        </StepWrapper>
    )
}

export default ShopSetupForm