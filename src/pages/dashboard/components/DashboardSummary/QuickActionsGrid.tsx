import { BoxMd } from 'assets/icons/Finance/Box/BoxMd'
import { Discount1Md } from 'assets/icons/Finance/Discount1/Discount1Md'
import { InvoiceMd } from 'assets/icons/Finance/Invoice/InvoiceMd'
import { CollectionMd } from 'assets/icons/System/Collection/CollectionMd'
import { QuickAction } from 'pages/dashboard/types/dashboard.types'
import React from 'react'
import DashboardSummaryGrid from './DashboardSummaryGrid'
import QuickActionButton from './QuickActionButton'

function QuickActionsGrid() {
    const actions: QuickAction[] = [
        { icon: <BoxMd color='white' />, label: 'Create Product', url: "/analytics/products" },
        { icon: <CollectionMd color='white' />, label: 'Create Collection', url: "/analytics/collections" },
        { icon: <InvoiceMd color='white' />, label: 'Create Invoice', url: "/analytics/invoice-management/create" },
        { icon: <Discount1Md color='white' />, label: 'Create Discount', url: "/analytics/account-settings" },
    ]

    return (
        <DashboardSummaryGrid gap={{ base: 3, md: 4, "2xl": 6 }}>
            {actions.map((action) =>
                <QuickActionButton key={action.label} action={action} />
            )}
        </ DashboardSummaryGrid>
    )
}

export default QuickActionsGrid