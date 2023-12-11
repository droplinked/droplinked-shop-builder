import { Box, VStack } from '@chakra-ui/react'
import { IgetRevenueServices } from 'lib/apis/dashboard/interfaces'
import { getRevenueServices } from 'lib/apis/dashboard/productServices'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import dashboardChartsContext, { dashboardChartsStates, IdashboardChartsStates } from './context'
import ButtonsChart from './parts/buttons/ButtonsChart'
import MiniCharts from './parts/charts/MiniCharts'
import GeneralStatisticsChart from './parts/generalStatistics/GeneralStatisticsChart'
import Revenue from './parts/revenue/Revenue'

function DashboardCharts() {
    const { mutate, isLoading } = useMutation((params: IgetRevenueServices) => getRevenueServices(params))
    const [States, setStates] = useState<IdashboardChartsStates>(dashboardChartsStates)

    const updateStates = (key: string, value: any) => setStates(prev => ({ ...prev, [key]: value }))

    useEffect(() => mutate({ dateRange: States.date }, { onSuccess: (data) => updateStates('revenue', data?.data?.data) }), [States.date])

    return (
        <dashboardChartsContext.Provider value={{ states: States, method: { updateStates }, isLoading: !isLoading }}>
            <VStack align="stretch" spacing="24px">
                <Box><Revenue /></Box>
                <Box><ButtonsChart /></Box>
                <Box><GeneralStatisticsChart /></Box>
                <Box><MiniCharts /></Box>
            </VStack>
        </dashboardChartsContext.Provider>
    )
}

export default DashboardCharts