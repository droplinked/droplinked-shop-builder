import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import PartnerList from './PartnerList'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function ReferredPartners() {
    const { t } = useLocaleResources('settings');

    return (
        <SectionContent
            title={t('settings.referrals.referredPartners.title')}
            description={t('settings.referrals.referredPartners.description')}
            rightContent={<PartnerList />}
        />
    )
}
