import { Box, Flex, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useCallback, useEffect } from 'react'
import MiniChartsFlags from '../charts/parts/charts/parts/flags/MiniChartsFlags'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import miniChartsFlagsModel from '../charts/parts/charts/parts/flags/model';
import { useMutation } from 'react-query';
import { bestPartnersService } from 'lib/apis/shop/shopServices';
ChartJS.register(ArcElement, Tooltip, Legend);

function ProductGroups() {
    const { mutate, data } = useMutation(() => bestPartnersService())

    useEffect(() => mutate(), [])

    const getValue = useCallback((title: string) => data?.data?.data.find(el => el?.title === title)?.value, [data])

    const { colors: { brown, yellow, gold } } = miniChartsFlagsModel
    const labels = ['Digital', 'Print on Demand', 'Physical Product']

    const items = {
        labels,
        datasets: [
            {
                data: [getValue('DIGITAL'), getValue('PRINT_ON_DEMAND'), getValue('NORMAL')],
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
    }

    return (
        <Flex alignItems="center" justifyContent="space-between" gap="30px">
            <VStack width="100%" align="stretch">
                <AppTypography fontSize='16px'>Product Groups</AppTypography>
                <Flex alignItems="center" gap="10px" flexWrap="wrap">
                    <MiniChartsFlags caption='Digital Product' color='yellow' />
                    <MiniChartsFlags caption='Print on Demand' color='gold' />
                    <MiniChartsFlags caption='Physical Product' color='brown' />
                </Flex>
            </VStack>
            <Box width="60px"><Doughnut options={options} data={items} /></Box>
        </Flex>
    )
}

export default ProductGroups