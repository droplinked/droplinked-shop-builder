import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import PartnerList from './PartnerList'

export default function ReferredPartners() {
    return (
        <SectionContent
            title='Referred Partners'
            description={"Explore the list of stores who've joined our community using your referral code."}
            rightContent={<PartnerList />}
        />
    )
}
