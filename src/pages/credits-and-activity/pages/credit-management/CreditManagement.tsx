import FlexContainer from 'pages/credits-and-activity/components/flex-container/FlexContainer'
import React from 'react'
import AccountBalance from './components/account-balance/AccountBalance'
import Inbound from './components/inbound/Inbound'
import Outbound from './components/outbound/Outbound'

export default function CreditManagement() {
    return (
        <FlexContainer
            items={[
                {
                    content: <AccountBalance />,
                    isFullWidth: true
                },
                {
                    content: <Inbound />,
                    isFullWidth: false
                },
                {
                    content: <Outbound />,
                    isFullWidth: false
                },
            ]}
        />
    )
}
