import { OnboardingStates } from "pages/onboarding/stores/useOnboardingStore"


interface IValidateStoreData {
    logoUrl: string
    coverImage: string
    url: string
    name: string
    description: string
    setError?: (field: keyof OnboardingStates['storeSetupError'], message: string | undefined) => void
}

export const validateStoreData = (storeSetup: IValidateStoreData, setError: IValidateStoreData["setError"]) => {
    let isValid = true

    // URL validation
    if (!storeSetup.url.trim()) {
        setError('url', 'URL is required')
        isValid = false
    } else if (!/^[a-zA-Z0-9-]+$/.test(storeSetup.url)) {
        setError('url', 'URL can only contain letters, numbers, and hyphens')
        isValid = false
    } else {
        setError('url', undefined)
    }

    // Name validation
    if (!storeSetup.name.trim()) {
        setError('name', 'Store name is required')
        isValid = false
    } else if (storeSetup.name.length < 3) {
        setError('name', 'Store name must be at least 3 characters')
        isValid = false
    } else {
        setError('name', undefined)
    }

    // Description validation
    if (storeSetup.description.trim()) {
        if (storeSetup.description.length < 150) {
            setError('description', 'Description must be at least 150 characters')
            isValid = false
        } else if (storeSetup.description.length > 160) {
            setError('description', 'Description must not exceed 160 characters')
            isValid = false
        } else {
            setError('description', undefined)
        }
    } else {
        setError('description', undefined)
    }

    return isValid
}
