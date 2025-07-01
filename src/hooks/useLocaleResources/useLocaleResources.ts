import i18next from 'i18next'
import commonAr from 'locales/common/ar.json'
import commonEn from 'locales/common/en.json'
import { useTranslation } from 'react-i18next'

export type Namespace =
    | '404Page'
    | 'homePage'
    | 'shop'
    | 'common'
    | 'shopManagement'
    | 'onchainRecords'
    | 'changelogPage'
    | 'purchaseHistory'
    | 'creditsAndActivity'
    | 'analyticsPage'
    | 'onboarding'
    | 'dashboardPage'
    | 'layout/sidebar'
    | 'layout/levelUp'
    | 'layout/userMenu'
    | 'subscription'
    | 'settings'
    | 'collections'
    | 'blogs'
    | 'gamification'
    | 'orderSamplePOD'
    | 'maintenancePage'
    | 'about'
    | 'privacyPage'
    | 'termsPage'
    | 'storefront'
    | 'acceptInvitation'
    | 'contactUs'
    | 'tile-design'
    | 'rewards'
    | 'affiliate'
    | 'payment-link'
    | 'products'
    | 'invoice-management'
    | 'crossmint'
    | 'public-pages/redesign-landings/crossmint'
    | 'public-pages/landings/tokenizing-products'
    | 'public-pages/landings/tokenpay'
    | 'public-pages/landings/roi'
    | 'public-pages/landings/roi-page'
    | 'public-pages/landings/physical-product'
    | 'public-pages/landings/affiliate-sass'
    | 'public-pages/landings/affiliate'
    | 'public-pages/landings/_components'
    | 'public-pages/landings/custom-token-page'
    | 'public-pages/landings/digital-product-page'
    | 'public-pages/landings/dpp-page'
    | 'public-pages/landings/metaverse-store-page'
    | 'public-pages/landings/partners-pages'
    | 'public-pages/landings/payment-link-page'
    | 'public-pages/landings/pod-product-page'
    | 'public-pages/landings/product-tile-page'
    | 'public-pages/landings/tokenpay'

/**
 * A custom hook to easily load translation resources into i18next and provide the translation function
 * @param namespace - The namespace for the translations
 * @param resources - An object containing local translation resources with language keys as object keys
 * @returns Object containing the translation function (t) and isRTL boolean
 * @example 
 * ```
 * // Usage example:
 * import localEn from './i18n/en.json'
 * import localAr from './i18n/ar.json'
 * 
 * const { t, isRTL } = useLocaleResources('myNamespace', {
 *   en: localEn,
 *   ar: localAr
 * })
 * // Now use t directly
 * t('your.translation.key')
 * // And check if current language is RTL
 * if (isRTL) {
 *   // Apply RTL specific styling
 * }
 * ```
 */
export default function useLocaleResources(
    namespace: Namespace,
    localResources: Record<string, Record<string, any>> = {}
) {
    // Get the translation function from react-i18next
    const { t, i18n } = useTranslation(namespace)

    // Merge common resources with local resources
    const mergedResources = {
        en: { ...commonEn, ...(localResources.en || {}) },
        ar: { ...commonAr, ...(localResources.ar || {}) }
    }

    // Add each language's resources to the specified namespace
    Object.entries(mergedResources).forEach(([language, resource]) => {
        i18next.addResourceBundle(language, namespace, resource, true, true)
    })

    // Check if current language is RTL
    const isRTL = () => {
        const currentLanguage = i18n.language;
        // List of RTL languages
        const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
        return rtlLanguages.includes(currentLanguage);
    }

    // Return the translation function and isRTL check
    return {
        t,
        isRTL: isRTL(),
    }
}
