import SectionContainer from 'pages/settings/components/common/SectionContainer'
import React from 'react'
import ReferralLink from './referral-link/ReferralLink'
import CustomCodes from './custom-codes/CustomCodes'
import ReferredPartners from './referred-partners/ReferredPartners'
import useAppStore from 'stores/app/appStore'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function Referrals() {
    const { shop: { referralDetails } } = useAppStore()
    const { count } = referralDetails ?? {}
    const { t } = useLocaleResources('settings');

    return (
        <SectionContainer title={t('settings.referrals.title')}>
            <ReferralLink />
            <CustomCodes />
            {(count !== 0 || !!count) && <ReferredPartners />}
        </SectionContainer>
    )
}
