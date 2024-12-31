import SectionContainer from 'pages/settings/components/SectionContainer'
import React from 'react'
import LoginMethods from './components/loginMethods/LoginMethods'
import PostPurchaseInfo from './components/post-purchase-info/PostPurchaseInfo'
import AgeGate from './components/age-gate/AgeGate'

export default function CustomerExperience() {
    return (
        <SectionContainer title="Customer Experience">
            {/* //TODO: Fix the login methods */}
            <LoginMethods />
            <PostPurchaseInfo />
            <AgeGate />
        </SectionContainer>
    )
}
