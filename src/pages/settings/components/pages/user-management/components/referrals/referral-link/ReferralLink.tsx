import useAppStore from 'stores/app/appStore'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import LinkContainer from './LinkContainer'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function ReferralLink() {
    const { shop: { referralDetails } } = useAppStore()
    const { code } = referralDetails ?? {}
    const { t } = useLocaleResources('settings');

    const description = t('Referrals.link.description', { code: code });

    return (
        <SectionContent title={t('Referrals.link.title')} description={description} rightContent={<LinkContainer />} />
    )
}