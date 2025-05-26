import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import { DashboardOrder } from 'services/dashboard/interfaces'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import SectionContainer from '../SectionContainer'
import OrderSummaryEmptyState from './EmptyState/OrderSummaryEmptyState'
import OrderItem from './OrderItem'

interface Props {
    isLoading: boolean,
    recentOrders: DashboardOrder[]
}

function OrderSummaryCard({ isLoading, recentOrders }: Props) {
    const navigate = useNavigate()

    return (
        <SectionContainer
            title="Order Summary"
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