import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import arCommon from '../data/translations/ar/common.json'
import arHome from '../data/translations/ar/home.json'
import arSettings from '../data/translations/ar/settings.json'
import enCommon from '../data/translations/en/common.json'
import enHome from '../data/translations/en/home.json'
import enSettings from '../data/translations/en/settings.json'

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
                home: enHome,
                settings: enSettings,
            },
            ar: {
                common: arCommon,
                home: arHome,
                settings: arSettings,
            }
        }
    })

export default i18n