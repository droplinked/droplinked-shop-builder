import SectionContainer from 'pages/settings/components/common/SectionContainer'
import React from 'react'
import LoginMethods from './components/loginMethods/LoginMethods'
import PostPurchaseInfo from './components/PostPurchaseInfo'
import AgeGate from './components/age-gate/AgeGate'

export default function CustomerExperience() {
    return (
        <SectionContainer title="Customer Experience" px={{ base: 4, md: 6 }}>
            <LoginMethods />
            <PostPurchaseInfo />
            <AgeGate />
        </SectionContainer>
    )
}
