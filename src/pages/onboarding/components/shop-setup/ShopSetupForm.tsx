import { Flex, useMediaQuery } from '@chakra-ui/react'
import useAppToast from 'hooks/toast/useToast'
import { setupShop } from 'lib/apis/shop/shopServices'
import useAppStore from 'lib/stores/app/appStore'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import React from 'react'
import { useMutation } from 'react-query'
import { validateStoreData } from '../../utils/shopSetupFormValidation'
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

function ShopSetupForm({ onNext }: OnboardingStepProps) {
    const { reset, updateState, user, shop } = useAppStore()
    const { storeSetup, setError, resetOnboarding } = useOnboardingStore()
    const { showToast } = useAppToast()
    const [isSmallerThan1024] = useMediaQuery("(max-width: 1024px)")

    const { mutateAsync: setupShopMutation, isLoading } = useMutation({
        mutationFn: () => setupShop(storeSetup),
        onSuccess: (data) => {
            updateState({ key: "shop", params: { ...shop, ...data.data.data } })
            updateState({ key: "user", params: { ...user, status: "SHOP_INFO_COMPLETED" } })
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
        reset()
        resetOnboarding()
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
            <ControlButtons onBack={handleBack} onSubmit={handleSubmit} isLoading={isLoading} backText='Exit' />
            {!isSmallerThan1024 && <AiAssistant />}
            {isSmallerThan1024 && <ShopPreview />}
        </>
    )
}

export default ShopSetupForm