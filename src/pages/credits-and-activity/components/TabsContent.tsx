import AppTab from 'components/redesign/tab/AppTab'
import React from 'react'
import CreditManagement from './credit-management/CreditManagement'

export default function TabsContent() {
    const tabs = [
        {
            title: "Credit Management",
            content: <CreditManagement />
        },
    ]

    return (
        <AppTab tabs={tabs} tabPanelStyle={{ paddingBlock: { base: 4, md: 6 } }} />
    )
}
