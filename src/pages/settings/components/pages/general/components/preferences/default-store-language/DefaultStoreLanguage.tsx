import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import LanguageSelect from './LanguageSelect'

function DefaultStoreLanguage() {
    const { t } = useLocaleResources('settings')

    return (
        <SectionContent
            title={t("settings.preferences.defaultLanguage.title")}
            description={t("settings.preferences.defaultLanguage.description")}
            rightContent={<LanguageSelect />}
        />
    )
}

export default DefaultStoreLanguage