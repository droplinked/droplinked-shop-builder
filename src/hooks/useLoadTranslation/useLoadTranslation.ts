import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
// Import common translation files directly in the hook
import commonAr from 'data/translations/ar/common.json'
import commonEn from 'data/translations/en/common.json'

/**
 * A custom hook to easily load translation resources into i18next and provide the translation function
 * @param namespace - The namespace for the translations
 * @param resources - An object containing local translation resources with language keys as object keys
 * @returns The translation function (t) from react-i18next
 * @example 
 * ```
 * // Usage example:
 * import localEn from './i18n/en.json'
 * import localAr from './i18n/ar.json'
 * 
 * const t = useLoadTranslation('myNamespace', {
 *   en: localEn,
 *   ar: localAr
 * })
 * // Now use t directly
 * t('your.translation.key')
 * ```
 */
export default function useLoadTranslation(
    namespace: string,
    localResources: Record<string, Record<string, any>> = {}
) {
    // Get the translation function from react-i18next
    const { t } = useTranslation(namespace)

    // Merge common resources with local resources
    const mergedResources = {
        en: { ...commonEn, ...(localResources.en || {}) },
        ar: { ...commonAr, ...(localResources.ar || {}) }
    }

    // Add each language's resources to the specified namespace
    Object.entries(mergedResources).forEach(([language, resource]) => {
        i18next.addResourceBundle(language, namespace, resource, true, true)
    })

    // Return the translation function
    return t
}
