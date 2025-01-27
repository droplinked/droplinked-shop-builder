import SectionContainer from 'pages/settings/components/common/SectionContainer'
import React from 'react'
import StoreURL from './components/StoreURL'
import StoreName from './components/StoreName'
import EmailAddress from './components/EmailAddress'
import CustomURL from './components/custom-url/CustomURL'
import Address from './components/Address/Address'

export default function StoreDetails() {


    return (
        <SectionContainer title="Store Details">
            <StoreURL />
            <StoreName />
            <EmailAddress />
            <CustomURL />
            <Address />
        </SectionContainer>
    )
}
