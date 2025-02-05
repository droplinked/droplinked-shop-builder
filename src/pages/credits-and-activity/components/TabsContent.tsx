import React from 'react'
import AppTab from 'components/redesign/AppTab/AppTab'
import CreditManagement from '../credit-management/CreditManagement'
import OnchainTransactions from '../onchain-transactions/OnchainTransactions'

export default function TabsContent() {
    const tabs = [
        {
            title: "Credit Management",
            content: <CreditManagement />
        },
        {
            title: "Onchain Transactions",
            content: <OnchainTransactions />
        }
    ]

    return (
        <AppTab tabs={tabs} tabPanelStyle={{ p: { base: 4, md: 6 } }} />
    )
}
