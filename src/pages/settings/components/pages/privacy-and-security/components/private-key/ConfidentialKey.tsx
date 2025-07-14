import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import { appDevelopment } from 'utils/app/variable'
import KeyContainer from './KeyContainer'

export default function ConfidentialKey() {
    const { t } = useLocaleResources('settings');

    return (
        <SectionContent
            title={t("settings.privacySecurity.privateKey.confidentialKey.title")}
            description={t("settings.privacySecurity.privateKey.confidentialKey.description")}
            rightContent={
                <KeyContainer />
            }
        >
            <InteractiveText
                to={`https://${appDevelopment ? "apiv3dev" : "apiv3"}.droplinked.com/api/privateapis#/`}
                target="_blank"
                hasExternalIcon
            >
                {t("settings.privacySecurity.privateKey.confidentialKey.learnMore")}
            </InteractiveText>
        </SectionContent>
    )
}
