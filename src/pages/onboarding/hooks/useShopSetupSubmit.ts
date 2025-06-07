import useAppToast from 'hooks/toast/useToast'
import { createDefaultSampleProducts } from 'lib/apis/product/productServices'
import { setupShop } from 'lib/apis/shop/shopServices'
import { useMutation } from 'react-query'
import useAppStore from 'stores/app/appStore'
import useOnboardingStore from '../stores/useOnboardingStore'
import { validateStoreData } from '../utils/shopSetupFormValidation'

interface UseShopSetupSubmitProps {
    onSuccess?: () => void
}

export function useShopSetupSubmit({ onSuccess }: UseShopSetupSubmitProps) {
    const { updateState, user, shop } = useAppStore()
    const { storeSetup, setError } = useOnboardingStore()
    const { showToast } = useAppToast()

    const { autoAddSampleProductsEnabled, ...shopData } = storeSetup

    const { mutateAsync: submitShopSetup, isLoading } = useMutation({
        mutationFn: async () => {
            const shopResponse = await setupShop(shopData)
            if (autoAddSampleProductsEnabled) await createDefaultSampleProducts(shopData.logo)
            return shopResponse
        },
        onSuccess: (data) => {
            updateState({ key: "shop", params: { ...shop, ...data.data.data } })
            updateState({ key: "user", params: { ...user, status: "SHOP_INFO_COMPLETED" } })
            onSuccess?.()
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
        isLoading
    }
} 