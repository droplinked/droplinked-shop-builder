import SectionContainer from 'pages/settings/components/common/SectionContainer'
import React from 'react'
import Address from './components/Address/Address'
import EmailAddress from './components/EmailAddress'
import StoreName from './components/StoreName'
import StoreURL from './components/StoreURL'
import CustomURL from './components/custom-url/CustomURL'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function StoreDetails() {
    const { t } = useLocaleResources('settings');

    return (
        <SectionContainer title={t("settings.title")} px={{ base: 4, md: 6 }}>
            <StoreURL />
            <StoreName />
            <EmailAddress />
            <CustomURL />
            <Address />
        </SectionContainer>
    )
}
