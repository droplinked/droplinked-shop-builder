import useAppToast from 'hooks/toast/useToast'
import useFileUpload from 'hooks/useFileUpload/useFileUpload'
import { createDefaultSampleProducts } from 'lib/apis/product/productServices'
import { setupShop } from 'lib/apis/shop/shopServices'
import { useMutation } from 'react-query'
import useAppStore from 'stores/app/appStore'
import useOnboardingStore from '../stores/useOnboardingStore'
import { validateStoreData } from '../utils/shopSetupFormValidation'

export function useShopSetupSubmit() {
    const { updateState, user, shop } = useAppStore()
    const {
        shopData,
        shopSetupUI,
        setError,
        resetOnboarding,
        updateOnboardingState
    } = useOnboardingStore()
    const { showToast } = useAppToast()
    const { mutateAsync: uploadFile } = useFileUpload()

    const { autoAddSampleProductsEnabled, hasExistingShop } = shopSetupUI

    const { mutateAsync: submitShopSetup, isLoading } = useMutation({
        mutationFn: async () => {
            let finalShopData = { ...shopData }

            // If user doesn't have an existing shop, upload logo and banner to CDN
            if (!hasExistingShop) {
                // Upload logo if it's a custom file (not from AI generation)
                if (shopData.logo && (shopData.logo.startsWith('blob:') || shopData.logo.startsWith('data:'))) {
                    try {
                        const logoFormData = new FormData()
                        // Convert blob/data URL to file and upload
                        const logoResponse = await fetch(shopData.logo)
                        const logoBlob = await logoResponse.blob()
                        logoFormData.append('image', logoBlob, 'logo.png')
                        const logoUploadResult = await uploadFile(logoFormData)
                        finalShopData.logo = logoUploadResult.original || shopData.logo
                    } catch (error) {
                        console.error('Error uploading logo:', error)
                        showToast({ type: "error", message: "Failed to upload logo" })
                    }
                }

                // Upload banner if it's a custom file (not from AI generation)
                if (shopData.hero_section && (shopData.hero_section.startsWith('blob:') || shopData.hero_section.startsWith('data:'))) {
                    try {
                        const bannerFormData = new FormData()
                        // Convert blob/data URL to file and upload
                        const bannerResponse = await fetch(shopData.hero_section)
                        const bannerBlob = await bannerResponse.blob()
                        bannerFormData.append('image', bannerBlob, 'banner.png')
                        const bannerUploadResult = await uploadFile(bannerFormData)
                        finalShopData.hero_section = bannerUploadResult.original || shopData.hero_section
                    } catch (error) {
                        console.error('Error uploading banner:', error)
                        showToast({ type: "error", message: "Failed to upload banner" })
                    }
                }
            }

            const shopResponse = await setupShop(finalShopData)
            if (autoAddSampleProductsEnabled) {
                await createDefaultSampleProducts(finalShopData.logo)
            }
            return shopResponse
        },
        onSuccess: (data) => {
            updateState({ key: "shop", params: { ...shop, ...data.data.data } })
            updateState({ key: "user", params: { ...user, status: "SHOP_INFO_COMPLETED" } })
            updateOnboardingState('currentStep', 'PAYMENT_DETAILS')
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.data?.message
            showToast({
                type: "error",
                message: errorMessage || "Failed to complete shop setup"
            })
        }
    })

    const handleSubmit = async () => {
        if (validateStoreData(shopData, setError)) {
            await submitShopSetup()
        }
    }

    return {
        handleSubmit,
        isLoading,
        resetOnboarding
    }
}