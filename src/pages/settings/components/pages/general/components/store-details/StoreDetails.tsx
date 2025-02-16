import SectionContainer from 'pages/settings/components/common/SectionContainer'
import React from 'react'
import Address from './components/Address/Address'
import EmailAddress from './components/EmailAddress'
import StoreName from './components/StoreName'
import StoreURL from './components/StoreURL'
import CustomURL from './components/custom-url/CustomURL'

export default function StoreDetails() {
    return (
        <SectionContainer title="Store Details" px={{ base: 4, md: 6 }}>
            <StoreURL />
            <StoreName />
            <EmailAddress />
            <CustomURL />
            <Address />
        </SectionContainer>
    )
}
