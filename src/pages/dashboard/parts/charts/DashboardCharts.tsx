import { Box, VStack } from '@chakra-ui/react'
import { getRevenueServices } from 'lib/apis/dashboard/productServices'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import ButtonsChart from './parts/buttons/ButtonsChart'
import MiniCharts from './parts/charts/MiniCharts'
import GeneralStatisticsChart from './parts/generalStatistics/GeneralStatisticsChart'
import Revenue from './parts/revenue/Revenue'

function DashboardCharts() {
    const { mutate, data } = useMutation(() => getRevenueServices())
    const [States, setStates] = useState()
  
    useEffect(() => {
      mutate()
    }, [])
  
    console.log('data', data?.data?.data);
  
    return (
        <VStack align="stretch" spacing="24px">
            <Box><Revenue /></Box>
            <Box><ButtonsChart /></Box>
            <Box><GeneralStatisticsChart /></Box>
            <Box><MiniCharts /></Box>
        </VStack>
    )
}

export default DashboardCharts