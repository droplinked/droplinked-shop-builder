import React from 'react'
import CreditManagement from '../pages/credit-management/CreditManagement'
import OnchainTransactions from '../pages/onchain-transactions/OnchainTransactions'
import AppTab from 'components/redesign/AppTab/AppTab'

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
