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
            title={t("PrivateKey.confidentialKey.title")}
            description={t("PrivateKey.confidentialKey.description")}
            rightContent={
                <KeyContainer />
            }
        >
            <InteractiveText
                to={`https://${appDevelopment ? "apiv3dev" : "apiv3"}.droplinked.com/api/privateapis#/`}
                target="_blank"
                rel="noopener noreferrer"
                hasExternalIcon
            >
                {t("PrivateKey.confidentialKey.learnMore")}
            </InteractiveText>
        </SectionContent>
    )
}
