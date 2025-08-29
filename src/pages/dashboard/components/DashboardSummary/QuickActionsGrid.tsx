import { BoxMd } from 'assets/icons/Finance/Box/BoxMd'
import { Discount1Md } from 'assets/icons/Finance/Discount1/Discount1Md'
import { InvoiceMd } from 'assets/icons/Finance/Invoice/InvoiceMd'
import { CollectionMd } from 'assets/icons/System/Collection/CollectionMd'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { QuickAction } from 'pages/dashboard/types/dashboard.types'
import React from 'react'
import DashboardSummaryGrid from './DashboardSummaryGrid'
import QuickActionButton from './QuickActionButton'

function QuickActionsGrid() {
    const { t } = useLocaleResources("dashboardPage")

    const actions: QuickAction[] = [
        { icon: <BoxMd color='white' />, label: t('QuickActionsGrid.createProduct'), url: "/analytics/products" },
        { icon: <CollectionMd color='white' />, label: t('QuickActionsGrid.createCollection'), url: "/analytics/collections" },
        { icon: <InvoiceMd color='white' />, label: t('QuickActionsGrid.createShippingProfile'), url: "/analytics/shipping-management" },
        { icon: <Discount1Md color='white' />, label: t('QuickActionsGrid.createDiscount'), url: "/analytics/account-settings" },
    ]

    return (
        <DashboardSummaryGrid gap={{ base: 3, md: 4, "2xl": 6 }}>
            {actions.map((action) =>
                <QuickActionButton key={action.label} action={action} />
            )}
        </DashboardSummaryGrid>
    )
}

export default QuickActionsGrid