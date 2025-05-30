import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import CustomCodesGenerator from './CustomCodesGenerator'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function CustomCodes() {
    const { t } = useLocaleResources('settings');

    return (
        <SectionContent
            title={t('settings.referrals.customCodes.title')}
            description={t('settings.referrals.customCodes.description')}
            rightContent={<CustomCodesGenerator />}
        />
    )
}
