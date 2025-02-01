import AppTypography from 'components/common/typography/AppTypography'
import FlexContainer from 'pages/credits-and-activity/components/flex-container/FlexContainer'
import React from 'react'
import AccountBalance from './components/AccountBalance'

export default function CreditManagement() {
    return (
        <FlexContainer
            items={[
                {
                    content: <AccountBalance />,
                    isFullWidth: true
                },
                {
                    content: <AppTypography color={"#fff"}>Content 2</AppTypography>,
                    isFullWidth: false
                },
                {
                    content: <AppTypography color={"#fff"}>Content 3</AppTypography>,
                    isFullWidth: false
                },
            ]}
        />
    )
}
