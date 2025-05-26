import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import arCommon from 'locale/ar/common.json'
import enCommon from 'locale/en/common.json'

// Read the saved language from localStorage (if executed in a browser environment)
const LOCAL_STORAGE_LANG_KEY = 'language'
const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_LANG_KEY) : null
const initialLanguage = savedLanguage || 'en'

// Set the HTML `dir` and `lang` attributes on first load so the document has the right
// direction and language before any React rendering happens.
if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('dir', initialLanguage === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', initialLanguage)
}

i18n
    .use(initReactI18next)
    .init({
        lng: initialLanguage,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: { common: enCommon },
            ar: { common: arCommon }
        }
    })

i18n.on('languageChanged', (lng) => {
    document.documentElement.setAttribute('dir', lng === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', lng)
    // Persist the selected language so it can be restored on the next visit
    if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_LANG_KEY, lng)
    }
})

export default i18n