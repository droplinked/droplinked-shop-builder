import { Box, Flex, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import MiniChartsFlags from '../../flags/MiniChartsFlags'

interface IProps {
  green: string
  purple: string
  value: string
  percentage: number
}
function OrdersChart({ green, purple, value, percentage }: IProps) {
  return (
    <VStack align="stretch">
      <AppTypography fontSize="28px" fontWeight="600">{value}</AppTypography>
      <Flex gap="16px">
        <MiniChartsFlags caption={green} color='green' />
        <MiniChartsFlags caption={purple} color='purple' />
      </Flex>
      <Box backgroundColor="#9C4EFF" overflow="hidden" borderRadius="100px"><Box backgroundColor="#2BCFA1" width={percentage+'%'} height="11px"></Box></Box>
    </VStack>
  )
}

export default OrdersChart