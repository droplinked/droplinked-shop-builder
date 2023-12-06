import { Box, Flex, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import OrdersChart from './parts/charts/orders/OrdersChart'
import ProfitChart from './parts/charts/profit/ProfitChart'

function MiniCharts() {

    const items = [
        {
            title: 'Overall Profit',
            width: '48%',
            component: <ProfitChart />,
        },
        {
            title: 'Orders',
            width: '26%',
            component: <OrdersChart green='121' purple='21' value='149' />,
        },
        {
            title: 'CustomerChart',
            width: '26%',
            component: <OrdersChart green='43' purple='35' value='76' />,
        }
    ]

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