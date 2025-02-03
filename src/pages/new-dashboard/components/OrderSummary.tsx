import { Box, Flex, Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useDashboardPageStore from '../stores/useDashboardStore'
import OrderSummaryEmptyState from './EmptyState/OrderSummaryEmptyState'
import SectionContainer from './SectionContainer'

export default function OrderSummary() {
    const dashboardData = useDashboardPageStore(s => s.dashboardData)
    const { recentOrders } = dashboardData ?? {}

    return (
        <SectionContainer title='Order Summary'>
            {recentOrders?.length === 0
                ? <OrderSummaryEmptyState />
                : (
                    <Box
                        overflowY="scroll" // Enable scrolling
                        css={{
                            '::-webkit-scrollbar': { display: 'none' },
                            scrollbarWidth: 'none', // For Firefox: hides the scrollbar
                        }}
                    >
                        {recentOrders.map((order: any) => <OrderItem key={order._id} order={order} />)}
                    </Box>

                )
            }
        </SectionContainer>
    )
}

function OrderItem({ order }: { order: any }) {
    const navigate = useNavigate()

    return (
        <Flex
            alignItems="center"
            gap={4}
            padding={{ base: 4, lg: "16px 24px" }}
        >
            <Flex flex={1} flexDirection="column" gap={1}>
                <Flex flexWrap="wrap" justifyContent="space-between" columnGap={4} rowGap={1}>
                    <Text color="#fff" fontSize={{ base: 14, lg: 16 }}>order #{order._id}</Text>
                    <FormattedPrice
                        price={order.totalPriceCart}
                        abbreviationProps={{ color: "#7B7B7B" }}
                    />
                </Flex>
                <Flex flexWrap="wrap" justifyContent="space-between" columnGap={4} rowGap={1}>
                    <Text fontSize={{ base: 12, lg: 14 }} color="#2BCFA1">{order.status}</Text>
                    <Text fontSize={{ base: 12, lg: 14 }} color="#7B7B7B">{formatDate(order.updatedAt)}</Text>
                </Flex>
            </Flex>

            <AppIcons.ChevronRight cursor="pointer" onClick={() => navigate("/analytics/orders")} />
        </Flex>
    )
}

function formatDate(dateString: string) {
    const dateObject = new Date(dateString)
    return dateObject.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}