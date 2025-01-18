import useAppStore from 'lib/stores/app/appStore'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import LinkContainer from './LinkContainer'

export default function ReferralLink() {
    const { shop: { referralDetails } } = useAppStore()
    const { code } = referralDetails ?? {}
    const description = `Share this referral link to earn rewards when others sign up. Invited users get 1 month of our Pro plan. \nAlternatively, users can enter the code ${code} or any of the below custom codes during registration.`

    return (
        <SectionContent title='Link' description={description} rightContent={<LinkContainer />} />
    )
}