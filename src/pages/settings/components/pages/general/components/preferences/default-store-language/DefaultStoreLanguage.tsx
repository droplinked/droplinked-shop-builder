import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import LanguageSelect from './LanguageSelect'
import { useFormikContext } from 'formik'
import { ISettings } from 'pages/settings/utils/formConfigs'

function DefaultStoreLanguage() {
    const { t } = useLocaleResources('settings')
    const { values, setFieldValue } = useFormikContext<ISettings>()

    const handleLanguageChange = (language: string) => {
        setFieldValue('defaultLanguage', language)
    }

    return (
        <SectionContent
            title={t("settings.preferences.defaultLanguage.title")}
            description={t("settings.preferences.defaultLanguage.description")}
            rightContent={
                <LanguageSelect
                    value={values.defaultLanguage}
                    onChange={handleLanguageChange}
                />
            }
        />
    )
}

export default DefaultStoreLanguage