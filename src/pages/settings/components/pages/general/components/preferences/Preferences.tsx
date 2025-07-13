import SectionContainer from 'pages/settings/components/common/SectionContainer'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import DefaultStoreLanguage from './default-store-language/DefaultStoreLanguage'

function Preferences() {
  const { t } = useLocaleResources('settings')

  return (
    <SectionContainer title={t("settings.preferences.title")} px={{ base: 4, md: 6 }}>
      <DefaultStoreLanguage />
    </SectionContainer>
  )
}

export default Preferences
