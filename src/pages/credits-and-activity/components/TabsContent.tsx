import AppTab from 'components/redesign/tab/AppTab'
import React from 'react'
import CreditManagement from './credit-management/CreditManagement'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function TabsContent() {
    const { t } = useLocaleResources("creditsAndActivity")

    const tabs = [
        {
            title: t("header.tabTitle"),
            content: <CreditManagement />
        },
    ]

    return (
        <AppTab tabs={tabs} tabPanelStyle={{ paddingBlock: { base: 4, md: 6 } }} />
    )
}
