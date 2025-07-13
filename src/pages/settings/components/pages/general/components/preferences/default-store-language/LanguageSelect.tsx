import React, { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import AppSelect from 'components/redesign/select/AppSelect'

const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Arabic', value: 'ar' }
]

function LanguageSelect() {
    const { i18n } = useTranslation()

    const handleLanguageChange = (selected: string) => {
        if (selected === i18n.language) return
        i18n.changeLanguage(selected)
    }

    return (
        <AppSelect
            items={languageOptions}
            labelAccessor="label"
            valueAccessor="value"
            selectProps={{
                value: i18n.language,
                onChange: (e) => handleLanguageChange(e.target.value)
            }}
        />
    )
}

export default LanguageSelect 