import useAppToast from 'hooks/toast/useToast'
import useFileUpload from 'hooks/useFileUpload/useFileUpload'
import { uploadToCdn } from 'lib/apis/ai/services'
import { createDefaultSampleProducts } from 'lib/apis/product/productServices'
import { setupShop } from 'lib/apis/shop/shopServices'
import { useMutation } from 'react-query'
import useAppStore from 'stores/app/appStore'
import useOnboardingStore from '../stores/useOnboardingStore'
import { validateStoreData } from '../utils/shopSetupFormValidation'

export function useShopSetupSubmit() {
    const { updateState, user, shop } = useAppStore()
    const { showToast } = useAppToast()
    const { mutateAsync: uploadFile } = useFileUpload()
    const { shopData, shopSetupUI, setError, resetOnboarding, updateOnboardingState } = useOnboardingStore()

    const { mutateAsync: submitShopSetup, isLoading } = useMutation({
        mutationFn: async () => {
            let finalShopData = { ...shopData }

            // Helper function to check if URL needs CDN upload
            const needsCdnUpload = (url: string) => {
                // If already uploaded to our CDN, no need to upload again
                if (url.startsWith('https://upload-file-droplinked.s3.amazonaws.com/')) {
                    return false
                }

                // Upload everything else (AI-generated images, blob URLs, data URLs, external URLs)
                return true
            }

            // Upload logo if it's AI-generated or external URL
            if (shopData.logo && needsCdnUpload(shopData.logo)) {
                try {
                    // Use backend service to upload AI-generated image to CDN
                    const { data } = await uploadToCdn(shopData.logo)
                    finalShopData.logo = data.cdnUrl
                } catch (error) {
                    console.error('Error uploading logo:', error)
                    showToast({ type: "error", message: "Failed to upload logo" })
                }
            }

            // Upload banner if it's AI-generated or external URL
            if (shopData.hero_section && needsCdnUpload(shopData.hero_section)) {
                try {
                    // Use backend service to upload AI-generated image to CDN
                    const { data } = await uploadToCdn(shopData.hero_section)
                    finalShopData.hero_section = data.cdnUrl
                } catch (error) {
                    console.error('Error uploading banner:', error)
                    showToast({ type: "error", message: "Failed to upload banner" })
                }
            }

            const shopResponse = await setupShop(finalShopData)
            if (shopSetupUI.autoAddSampleProductsEnabled) {
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