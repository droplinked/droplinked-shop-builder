import AppSelect from 'components/redesign/select/AppSelect'
import React from 'react'
import { useTranslation } from 'react-i18next'

const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Arabic', value: 'ar' }
]

interface LanguageSelectProps {
    value?: string
    onChange?: (language: string) => void
}

function LanguageSelect({ value, onChange }: LanguageSelectProps) {
    const { i18n } = useTranslation()

    // Use props if provided, otherwise fall back to current language
    const currentValue = value ?? i18n.language

    const handleLanguageChange = (selected: string) => {
        if (onChange) {
            onChange(selected)
        } else {
            // Fallback to directly changing language
            i18n.changeLanguage(selected)
        }
    }

    return (
        <AppSelect
            items={languageOptions}
            labelAccessor="label"
            valueAccessor="value"
            selectProps={{
                value: currentValue,
                onChange: (e) => handleLanguageChange(e.target.value)
            }}
        />
    )
}

export default LanguageSelect