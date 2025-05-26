import AppSelect from 'components/redesign/select/AppSelect'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import { useTranslation } from 'react-i18next'

function DefaultStoreLanguage() {
    const { i18n } = useTranslation()

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
            title="Default Store Language"
            description="Choose a preferred language across the platform. Users can change the language upon entering the store."
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