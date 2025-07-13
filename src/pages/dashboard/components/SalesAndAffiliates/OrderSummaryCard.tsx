import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardOrder } from 'services/dashboard/interfaces'
import SectionContainer from '../SectionContainer'
import OrderSummaryEmptyState from './EmptyState/OrderSummaryEmptyState'
import OrderItem from './OrderItem'

interface Props {
    recentOrders: DashboardOrder[]
}

function OrderSummaryCard({ recentOrders }: Props) {
    const navigate = useNavigate()
    const { t } = useLocaleResources("dashboardPage")

    return (
        <SectionContainer
            title={t('orderSummaryCard.title')}
            onNavigate={() => navigate("/analytics/purchase-history")}
        >
            {!recentOrders?.length
                ? <OrderSummaryEmptyState />
                : (
                    <RuledGrid columns={1} nested borderColor="neutral.gray.1000">
                        {recentOrders.map((order) => (
                            <OrderItem key={order._id} order={order} onNavigate={navigate} />
                        ))}
                    </RuledGrid>
                )
            }
        </SectionContainer>
    )
}

export default OrderSummaryCard