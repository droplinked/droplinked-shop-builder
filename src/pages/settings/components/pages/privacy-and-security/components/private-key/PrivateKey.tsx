import AccessLevelBadge from 'components/redesign/access-level-badge/AccessLevelBadge'
import SectionContainer from 'pages/settings/components/common/SectionContainer'
import React from 'react'
import ConfidentialKey from './ConfidentialKey'

export default function PrivateKey() {

    return (
        <SectionContainer
            title="Private Key"
            badge={<AccessLevelBadge justLevel level="Premium" />}>
            <ConfidentialKey />
        </SectionContainer>
    )
}
