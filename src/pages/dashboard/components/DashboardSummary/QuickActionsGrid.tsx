import AppIcons from 'assets/icon/Appicons'
import { QuickAction } from 'pages/dashboard/types/dashboard.types'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardSummaryGrid from './DashboardSummaryGrid'
import QuickActionButton from './QuickActionButton'

function QuickActionsGrid() {
    const actions: QuickAction[] = [
        { icon: <AppIcons.HeaderProductBox />, label: 'Create Product', url: "/analytics/products" },
        { icon: <AppIcons.Collection />, label: 'Create Collection', url: "/analytics/collections" },
        { icon: <AppIcons.Invoice />, label: 'Create Invoice', url: "/analytics/invoice-management/create" },
        { icon: <AppIcons.Discount />, label: 'Create Discount', url: "/analytics/account-settings" },
    ]

    return (
        <DashboardSummaryGrid>
            {actions.map((action) =>
                <QuickActionButton key={action.label} action={action} />
            )}
        </ DashboardSummaryGrid>
    )
}

export default QuickActionsGrid