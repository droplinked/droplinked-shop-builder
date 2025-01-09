import SectionContainer from 'pages/settings/components/common/SectionContainer'
import React from 'react'
import ReferralLink from './referral-link/ReferralLink'
import CustomCodes from './custom-codes/CustomCodes'
import ReferredPartners from './referred-partners/ReferredPartners'
import useAppStore from 'lib/stores/app/appStore'

export default function Referrals() {
    const { shop: { referralDetails } } = useAppStore()
    const { count } = referralDetails
    return (
        <SectionContainer title='Referrals'>
            <ReferralLink />
            <CustomCodes />
            {(count !== 0 || count) && <ReferredPartners />}
        </SectionContainer>
    )
}
