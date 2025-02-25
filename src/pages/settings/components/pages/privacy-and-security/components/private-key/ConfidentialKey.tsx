import { appDevelopment } from 'lib/utils/app/variable'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import KeyContainer from './KeyContainer'
import ExternalLink from 'components/redesign/external-link/ExternalLink'
import AppIcons from 'assets/icon/Appicons'

export default function ConfidentialKey() {
    return (
        <SectionContent
            title="Confidential Key"
            description="Save the Private Key for secure access to store settings. Keep it safe, as it’s crucial for the account’s security."
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
                Learn More
                <AppIcons.ExternalLink style={{ display: "inline-block" }} />
            </ExternalLink>
        </SectionContent>
    )
}
