import { appDevelopment } from 'lib/utils/app/variable'
import LearnMore from 'pages/settings/components/common/NavigationLink'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import KeyContainer from './KeyContainer'

export default function ConfidentialKey() {
    return (
        <SectionContent
            title="Confidential Key"
            description="Save the Private Key for secure access to store settings. Keep it safe, as it’s crucial for the account’s security."
            rightContent={
                <KeyContainer />
            }
        >
            <LearnMore title='Learn More' to={`https://${appDevelopment ? "apiv3dev" : "apiv3"}.droplinked.com/api/privateapis#/`} target='_blank' />
        </SectionContent>
    )
}
