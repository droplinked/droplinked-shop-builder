import { Flex, VStack } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import React, { useState } from 'react'
import dashboardPageContext, { dashboardPageState } from './context'
import DashboardCharts from './parts/charts/DashboardCharts'
import Clarity from './parts/clarity/Clarity'
import ProductGroups from './parts/groups/ProductGroups'
import PartnersDashboard from './parts/partner/PartnersDashboard'
import BestSelling from './parts/selling/BestSelling'
import WelcomeDashboard from './parts/welcome/WelcomeDashboard'

function DashboardPage() {
  const [States, setStates] = useState(dashboardPageState)

  const updateStates = (key: string, value: string) => setStates(prev => ({ ...prev, [key]: value }))
  const updateDateRange = (key: string, value: string) => setStates(prev => ({ ...prev, dateRange: { ...prev.dateRange, [key]: value } }))

  return (
    <dashboardPageContext.Provider value={{ states: States, method: { updateStates, updateDateRange } }}>
      <VStack align="stretch" spacing="24px">
        <WelcomeDashboard />
        <Flex gap="24px" alignItems="flex-start">
          <AppCard boxProps={{ width: "65%", padding: "30px" }}><DashboardCharts /></AppCard>
          <VStack width="45%" justifyContent="space-between" alignItems="center" align="stretch" spacing="24px">
            <AppCard boxProps={{ padding: "30px" }}><BestSelling /></AppCard>
            <AppCard boxProps={{ padding: "30px" }}><ProductGroups /></AppCard>
          </VStack>
        </Flex>
        <Clarity />
        <AppCard boxProps={{ padding: "30px" }}><PartnersDashboard /></AppCard>
      </VStack>
    </dashboardPageContext.Provider>
  )
}

export default DashboardPage