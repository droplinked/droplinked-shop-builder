import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import PartnerList from './PartnerList'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function ReferredPartners() {
    const { t } = useLocaleResources('settings');

    return (
        <SectionContent
            title={t('Referrals.referredPartners.title')}
            description={t('Referrals.referredPartners.description')}
            rightContent={<PartnerList />}
        />
    )
}
