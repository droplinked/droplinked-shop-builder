import { Box, Flex, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import MiniChartsFlags from '../charts/parts/charts/parts/flags/MiniChartsFlags'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import miniChartsFlagsModel from '../charts/parts/charts/parts/flags/model';
ChartJS.register(ArcElement, Tooltip, Legend);

function ProductGroups() {
    const { colors: { brown, yellow, gold } } = miniChartsFlagsModel
    const labels = ['Jan', 'Feb', 'Mar']

    const data = {
        labels,
        datasets: [
            {
                data: [65, 59, 80],
                backgroundColor: [yellow, gold, brown],
                borderWidth: 0,
                cutout: 20,
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        datasets: {
            doughnut: {
                borderRadius: 1,
                offset: 5,
            }
        },
        plugins: {
            legend: {
                display: false,
            },
        }
    };

    return (
        <Flex alignItems="center" justifyContent="space-between" gap="30px">
            <VStack width="100%" align="stretch">
                <AppTypography fontSize='16px'>Product Groups</AppTypography>
                <Flex alignItems="center" gap="10px" flexWrap="wrap">
                    <MiniChartsFlags caption='Physical Product' color='yellow' />
                    <MiniChartsFlags caption='Print on Demand' color='gold' />
                    <MiniChartsFlags caption='Digital Product' color='brown' />
                </Flex>
            </VStack>
            <Box width="60px"><Doughnut options={options} data={data} /></Box>
        </Flex>
    )
}

export default ProductGroups