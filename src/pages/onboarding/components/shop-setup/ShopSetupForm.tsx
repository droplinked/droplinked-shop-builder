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
import ShopPreview from '../shop-preview/ShopPreview'
import useAppToast from 'hooks/toast/useToast'
import { useMutation } from 'react-query'
import { setupShop } from 'lib/apis/shop/shopServices'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useAppStore from 'lib/stores/app/appStore'

function ShopSetupForm({ onNext }: OnboardingStepProps) {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { reset } = useAppStore()
    const { updateOnboardingState, storeSetup, setError } = useOnboardingStore()
    const { showToast } = useAppToast()
    const [isSmallerThan1024] = useMediaQuery("(max-width: 1024px)")

    const origin = searchParams?.get('origin')

    const { mutateAsync: setupShopMutation, isLoading } = useMutation({
        mutationFn: () => setupShop(storeSetup),
        onSuccess: (data) => {
            console.log(data.data)
            onNext()
        },
        onError: (error: any) => {
            showToast({
                type: "error",
                message: error.response.data.data.message || "Something went wrong",
            })
        }
    })

    const handleSubmit = async () => {
        if (validateStoreData(storeSetup, setError)) await setupShopMutation()
    }

    const handleBack = () => {
        if (origin) return navigate(`/${origin}`)

        reset()
        updateOnboardingState("storeSetup", initialStoreSetup)
        updateOnboardingState("currentStep", "SIGN_IN")
        navigate('/onboarding')
    }

    return (
        <>
            <Flex flexDirection={{ base: "column", md: "row" }} justifyContent="space-between" gap={4}>
                <OnboardingStepHeader heading='Store Details' description='Complete the information below to optimize your storefront.' />
                {isSmallerThan1024 && <AiAssistantButton />}
            </Flex>
            <LogoUploader />
            <CoverImage />
            <UrlChooser />
            <NameField />
            <DescriptionField />
            <ControlButtons onBack={handleBack} onSubmit={handleSubmit} isLoading={isLoading} backText={origin ? "Back" : "Exit"} />
            {!isSmallerThan1024 && <AiAssistant />}
            {isSmallerThan1024 && <ShopPreview />}
        </>
    )
}

export default ShopSetupForm