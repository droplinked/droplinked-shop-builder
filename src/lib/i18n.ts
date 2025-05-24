import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import arCommon from '../data/translations/ar/common.json'
import enCommon from '../data/translations/en/common.json'

i18n
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        ns: ['common', 'home', 'settings'],
        defaultNS: 'common',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                common: enCommon,
            },
            ar: {
                common: arCommon,
            }
        }
    })

export default i18n