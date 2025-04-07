import { OnboardingStates } from "../types/onboarding"

interface IValidateStoreData {
    logo: string
    hero_section: string
    shop_url: string
    name: string
    description: string
    setError?: (field: keyof OnboardingStates['storeSetupErrors'], message: string | undefined) => void
}

export const validateStoreData = (storeSetup: IValidateStoreData, setError: IValidateStoreData["setError"]) => {
    let isValid = true

    // URL validation
    if (!storeSetup?.shop_url?.trim()) {
        setError('shop_url', 'URL is required')
        isValid = false
    } else if (!/^[a-zA-Z0-9-]+$/.test(storeSetup.shop_url)) {
        setError('shop_url', 'URL can only contain letters, numbers, and hyphens')
        isValid = false
    } else {
        setError('shop_url', undefined)
    }

    // Name validation
    if (!storeSetup?.name?.trim()) {
        setError('name', 'Store name is required')
        isValid = false
    } else if (storeSetup.name.length < 3) {
        setError('name', 'Store name must be at least 3 characters')
        isValid = false
    } else {
        setError('name', undefined)
    }

    return isValid
}
