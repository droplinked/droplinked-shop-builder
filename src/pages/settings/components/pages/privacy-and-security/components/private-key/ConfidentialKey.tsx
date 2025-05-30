import { appDevelopment } from 'utils/app/variable'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import KeyContainer from './KeyContainer'
import ExternalLink from 'components/redesign/external-link/ExternalLink'
import AppIcons from 'assets/icon/Appicons'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

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
            <ExternalLink
                href={`https://${appDevelopment ? "apiv3dev" : "apiv3"}.droplinked.com/api/privateapis#/`}
                textDecor={"none"}
                display={"flex"}
                alignItems={"center"}
                fontSize={16}
                fontWeight={500}
                gap={"6px"}
                target='_blank'
            >
                {t("settings.privacySecurity.privateKey.confidentialKey.learnMore")}
                <AppIcons.ExternalLink style={{ display: "inline-block" }} />
            </ExternalLink>
        </SectionContent>
    )
}
