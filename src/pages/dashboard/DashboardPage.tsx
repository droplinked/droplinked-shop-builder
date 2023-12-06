import { Flex, VStack } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import React from 'react'
import DashboardCharts from './parts/charts/DashboardCharts'
import ProductGroups from './parts/groups/ProductGroups'
import PartnersDashboard from './parts/partner/PartnersDashboard'
import BestSelling from './parts/selling/BestSelling'
import WelcomeDashboard from './parts/welcome/WelcomeDashboard'

function DashboardPage() {
  return (
    <VStack align="stretch" spacing="24px">
      <WelcomeDashboard />
      <Flex gap="24px">
        <AppCard boxProps={{ width: "65%", padding: "30px" }}><DashboardCharts /></AppCard>
        <VStack width="45%" justifyContent="space-between" alignItems="center" align="stretch" spacing="24px">
          <AppCard boxProps={{ padding: "30px" }}><BestSelling /></AppCard>
          <AppCard boxProps={{ padding: "30px" }}><ProductGroups /></AppCard>
        </VStack>
      </Flex>
      <AppCard boxProps={{ padding: "30px" }}><PartnersDashboard /></AppCard>
    </VStack>
  )
}

export default DashboardPage