import AppSelect from 'components/redesign/select/AppSelect'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import { useTranslation } from 'react-i18next'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

function DefaultStoreLanguage() {
    const { i18n } = useTranslation()
    const { t } = useLocaleResources('settings')

    const languageOptions = [
        { label: 'English', value: 'en' },
        { label: 'Arabic', value: 'ar' }
    ]

    const handleLanguageChange = (selected: string) => {
        if (selected !== i18n.language)
            i18n.changeLanguage(selected)
    }

    return (
        <SectionContent
            title={t("settings.preferences.defaultLanguage.title")}
            description={t("settings.preferences.defaultLanguage.description")}
            rightContent={
                <AppSelect
                    items={languageOptions}
                    labelAccessor="label"
                    valueAccessor="value"
                    selectProps={{
                        value: i18n.language,
                        onChange: (e) => handleLanguageChange(e.target.value)
                    }}
                />
            }
        />
    )
}

export default DefaultStoreLanguage