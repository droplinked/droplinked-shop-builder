import { Box, Flex, VStack } from '@chakra-ui/react';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import AppTypography from 'components/common/typography/AppTypography';
import { bestPartnersService } from 'lib/apis/shop/shopServices';
import React, { useCallback, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useMutation } from 'react-query';
import MiniChartsFlags from '../charts/parts/charts/parts/flags/MiniChartsFlags';
import miniChartsFlagsModel from '../charts/parts/charts/parts/flags/model';
import DashboardEmpty from '../parts/empty/DashboardEmpty';

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
                <AppTypography fontSize='16px'>Sales based Categories</AppTypography>
                {data?.data?.data?.length > 0 ? 
                    <Flex alignItems="center" gap="10px" flexWrap="wrap">
                        <MiniChartsFlags caption='Digital Goods' color='yellow' />
                        <MiniChartsFlags caption='Production on Demand Items' color='gold' />
                        <MiniChartsFlags caption='Physical Products' color='brown' />
                    </Flex> 
                    : 
                    <Flex alignItems="center" justifyContent={'flex-start'} width={"100%"}>
                        <DashboardEmpty minHeight={"20px"}  />
                    </Flex>
                }
            </VStack>
            <Box width="60px"><Doughnut options={options} data={items} /></Box>
        </Flex>
    )
}

export default ProductGroups