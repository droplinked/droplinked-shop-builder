import AccessLevelBadge from 'components/redesign/access-level-badge/AccessLevelBadge'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import SectionContainer from 'pages/settings/components/common/SectionContainer'
import React from 'react'
import ConfidentialKey from './ConfidentialKey'

export default function PrivateKey() {
    const { t } = useLocaleResources('settings');

    return (
        <SectionContainer
            title={t("settings.privacySecurity.privateKey.title")}
            badge={
                <AccessLevelBadge justLevel level="Premium" />
            }>
            <ConfidentialKey />
        </SectionContainer>
    )
}
