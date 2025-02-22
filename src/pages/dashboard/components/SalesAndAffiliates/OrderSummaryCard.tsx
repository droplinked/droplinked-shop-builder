import { DashboardOrder } from 'lib/apis/dashboard/interfaces'
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
            onNavigate={() => navigate("/analytics/orders")}
        >
            {!recentOrders?.length
                ? <OrderSummaryEmptyState />
                : recentOrders.map((order, index) => (
                    <OrderItem
                        key={order._id}
                        order={order}
                        isLastItem={index === recentOrders.length - 1}
                        onNavigate={navigate}
                    />
                ))
            }
        </SectionContainer>
    )
}

export default OrderSummaryCard