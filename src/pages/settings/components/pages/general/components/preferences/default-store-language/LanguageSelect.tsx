import AppSelect from 'components/redesign/select/AppSelect'
import { useFormikContext } from 'formik'
import React from 'react'
import { ISettings } from 'pages/settings/utils/formConfigs'

const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Arabic', value: 'ar' }
]

function LanguageSelect() {
    const { values, setFieldValue } = useFormikContext<ISettings>()

    const handleLanguageChange = (selected: string) => {
        setFieldValue('defaultLanguage', selected)
    }

    return (
        <AppSelect
            items={languageOptions}
            labelAccessor="label"
            valueAccessor="value"
            selectProps={{
                value: values.defaultLanguage,
                onChange: (e) => handleLanguageChange(e.target.value)
            }}
        />
    )
}

export default LanguageSelect