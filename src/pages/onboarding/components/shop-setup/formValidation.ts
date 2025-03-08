import { OnboardingData } from "pages/onboarding/store/useOnboardingStore"

interface IValidateStoreData {
    logoUrl: string
    coverImage: string
    url: string
    name: string
    description: string
    setError?: (field: keyof OnboardingData['errors'], message: string | undefined) => void
}

export const validateStoreData = (storeData: IValidateStoreData, setError: IValidateStoreData["setError"]) => {
    let isValid = true

    // URL validation
    if (!storeData.url.trim()) {
        setError('url', 'URL is required')
        isValid = false
    } else if (!/^[a-zA-Z0-9-]+$/.test(storeData.url)) {
        setError('url', 'URL can only contain letters, numbers, and hyphens')
        isValid = false
    } else {
        setError('url', undefined)
    }

    // Name validation
    if (!storeData.name.trim()) {
        setError('name', 'Store name is required')
        isValid = false
    } else if (storeData.name.length < 3) {
        setError('name', 'Store name must be at least 3 characters')
        isValid = false
    } else {
        setError('name', undefined)
    }

    // Description validation
    if (storeData.description.trim()) {
        if (storeData.description.length < 150) {
            setError('description', 'Description must be at least 150 characters')
            isValid = false
        } else if (storeData.description.length > 160) {
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
