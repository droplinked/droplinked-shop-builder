import SectionContainer from 'pages/settings/components/common/SectionContainer'
import React from 'react'
import PremiumBadge from 'pages/settings/components/common/PremiumBadge'
import ConfidentialKey from './ConfidentialKey'

export default function PrivateKey() {

    return (
        <SectionContainer
            title="Private Key"
            badge={
                <PremiumBadge />
            }>
            <ConfidentialKey />
        </SectionContainer>
    )
}
