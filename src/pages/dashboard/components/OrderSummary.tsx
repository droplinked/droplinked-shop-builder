import { Box } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useDashboardPageStore from '../stores/useDashboardStore'
import OrderSummaryEmptyState from './EmptyState/OrderSummaryEmptyState'
import OrderItem from './OrderItem'
import SectionContainer from './SectionContainer'

function OrderSummary() {
    const navigate = useNavigate()
    const { recentOrders } = useDashboardPageStore(state => state.dashboardData)

    const handleNavigation = (path: string) => navigate(path)

    return (
        <SectionContainer
            title="Order Summary"
            onLinkClick={() => handleNavigation("/analytics/orders")}
        >
            {!recentOrders?.length
                ? <OrderSummaryEmptyState />
                : (
                    <Box
                        overflowY="scroll" // Enable scrolling
                        css={{
                            '::-webkit-scrollbar': { display: 'none' },
                            scrollbarWidth: 'none', // For Firefox: hides the scrollbar
                        }}
                    >
                        {recentOrders?.map((order) =>
                            <OrderItem key={order._id} order={order} handleNavigation={handleNavigation} />
                        )}
                    </Box>
                )
            }
        </SectionContainer>
    )
}

export default OrderSummary