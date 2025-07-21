import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import CustomCodesGenerator from './CustomCodesGenerator'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function CustomCodes() {
    const { t } = useLocaleResources('settings');

    return (
        <SectionContent
            title={t('Referrals.customCodes.title')}
            description={t('Referrals.customCodes.description')}
            rightContent={<CustomCodesGenerator />}
        />
    )
}
