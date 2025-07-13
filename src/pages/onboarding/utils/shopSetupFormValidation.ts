import { OnboardingStates } from "../types/onboarding"
import { TFunction } from "i18next"

interface IValidateStoreData {
    logo: string
    hero_section: string
    shop_url: string
    name: string
    description: string
    setError?: (field: keyof OnboardingStates['storeSetupErrors'], message: string | undefined) => void
}

export const validateStoreData = (
    storeSetup: IValidateStoreData, 
    setError: IValidateStoreData["setError"],
    t: TFunction
) => {
    let isValid = true

    // URL validation
    if (!storeSetup?.shop_url?.trim()) {
        setError('shop_url', t('common.validation.urlRequired'))
        isValid = false
    } else if (!/^[a-zA-Z0-9-]+$/.test(storeSetup.shop_url)) {
        setError('shop_url', t('common.validation.urlFormat'))
        isValid = false
    } else {
        setError('shop_url', undefined)
    }

    // Name validation
    if (!storeSetup?.name?.trim()) {
        setError('name', t('common.validation.nameRequired'))
        isValid = false
    } else if (storeSetup.name.length < 3) {
        setError('name', t('shopSetup.validation.nameLength'))
        isValid = false
    } else {
        setError('name', undefined)
    }

    return isValid
}
