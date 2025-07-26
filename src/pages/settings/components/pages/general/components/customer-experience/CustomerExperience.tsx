import SectionContainer from 'pages/settings/components/common/SectionContainer'
import React from 'react'
import LoginMethods from './components/loginMethods/LoginMethods'
import PostPurchaseInfo from './components/PostPurchaseInfo'
import AgeGate from './components/age-gate/AgeGate'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function CustomerExperience() {
    const { t } = useLocaleResources('settings')

    return (
        <SectionContainer title={t('CustomerExperience.title')} px={{ base: 4, md: 6 }}>
            <LoginMethods />
            <PostPurchaseInfo />
            <AgeGate />
        </SectionContainer>
    )
}
