import { Box, Flex, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { getPercentage } from 'lib/utils/heper/helpers'
import React, { useContext, useMemo } from 'react'
import dashboardChartsContext from '../../context'
import OrdersChart from './parts/charts/orders/OrdersChart'
import ProfitChart from './parts/charts/profit/ProfitChart'

function MiniCharts() {
    const { states: { revenue } } = useContext(dashboardChartsContext)
    const items = useMemo(() => {
        const data = revenue?.report
        const order = data?.orders
        const customer = data?.customerChart

        return [
            {
                title: 'Net Profit',
                width: '48%',
                component: <ProfitChart />,
            },
            {
                title: 'Orders',
                width: '26%',
                component: <OrdersChart green={order?.direct} purple={order?.affiliate} value={order?.value} percentage={getPercentage(order?.direct, order?.value)} />,
            },
            {
                title: 'CustomerChart',
                width: '26%',
                component: <OrdersChart green={customer?.direct} purple={customer?.affiliate} value={customer?.value} percentage={getPercentage(customer?.direct, customer?.value)} />,
            }
        ]
    }, [revenue])

    return (
        <Flex gap="16px">
            {items.map((el, key) => (
                <VStack key={key} width={el.width} borderRadius="4px" backgroundColor="#222" padding="16px 24px" align="stretch">
                    <AppTypography fontSize="12px">{el.title}</AppTypography>
                    <Box>{el.component}</Box>
                </VStack>
            ))}
        </Flex>
    )
}

export default MiniCharts