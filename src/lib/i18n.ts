import i18n from 'i18next'
import arCommon from 'locales/common/ar.json'
import enCommon from 'locales/common/en.json'
import { initReactI18next } from 'react-i18next'
import { getLanguageFromCookie, setLanguageInCookie, setHTMLAttributes } from '../utils/languageUtils'

// Read the saved language from cookie (if executed in a browser environment)
const initialLanguage = getLanguageFromCookie();

// Set the HTML `dir` and `lang` attributes on first load so the document has the right
// direction and language before any React rendering happens.
if (typeof document !== 'undefined') {
    setHTMLAttributes(initialLanguage);
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
    setHTMLAttributes(lng);
    // Persist the selected language in cookie so it can be restored on the next visit
    setLanguageInCookie(lng);
})

export default i18n