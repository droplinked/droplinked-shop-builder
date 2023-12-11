import { Box, Flex, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import dashboardChartsContext from 'pages/dashboard/parts/charts/context'
import React, { useContext } from 'react'
import MiniChartsFlags from '../../flags/MiniChartsFlags'

interface IProps {
  green: string
  purple: string
  value: string
  percentage: number
}
function OrdersChart({ green, purple, value, percentage }: IProps) {
  const { isLoading } = useContext(dashboardChartsContext)

  return (
    <VStack align="stretch">
      <AppSkeleton isLoaded={isLoading}>
        <AppTypography fontSize="28px" fontWeight="600">{value}</AppTypography>
      </AppSkeleton>
      <AppSkeleton isLoaded={isLoading}>
        <Flex gap="16px">
          <MiniChartsFlags caption={green} color='green' />
          <MiniChartsFlags caption={purple} color='purple' />
        </Flex>
      </AppSkeleton>
      <AppSkeleton isLoaded={isLoading}>
        <Box backgroundColor="#9C4EFF" overflow="hidden" borderRadius="100px"><Box backgroundColor="#2BCFA1" width={percentage + '%'} height="11px"></Box></Box>
      </AppSkeleton>
    </VStack>
  )
}

export default OrdersChart