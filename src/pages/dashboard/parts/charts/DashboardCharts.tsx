import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import ButtonsChart from './parts/buttons/ButtonsChart'
import MiniCharts from './parts/charts/MiniCharts'
import GeneralStatisticsChart from './parts/generalStatistics/GeneralStatisticsChart'
import Revenue from './parts/revenue/Revenue'

function DashboardCharts() {
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