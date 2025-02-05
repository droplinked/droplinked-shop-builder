import AppTab from 'components/redesign/AppTab/AppTab'
import React from 'react'
import CreditManagement from '../credit-management/CreditManagement'

export default function TabsContent() {
    const tabs = [
        {
            title: "Credit Management",
            content: <CreditManagement />
        },
    ]

    return (
        <AppTab tabs={tabs} tabPanelStyle={{ p: { base: 4, md: 6 } }} />
    )
}
