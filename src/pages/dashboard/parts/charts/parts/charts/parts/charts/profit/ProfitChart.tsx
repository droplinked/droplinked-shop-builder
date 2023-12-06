import { Box, Flex, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import MiniChartsFlags from '../../flags/MiniChartsFlags'

function ProfitChart() {

  const items: any = [
    {
      caption: 'Direct',
      color: 'green',
      value: '$923.92',
      width: '100%',
      chartColor: '#2BCFA1'
    },
    {
      caption: 'Affiliate',
      color: 'purple',
      value: '$3.92',
      width: '30%',
      chartColor: '#9C4EFF'
    }
  ]

  return (
    <VStack align="stretch">
      <AppTypography fontSize="18px" fontWeight="600">$2323.96</AppTypography>
      {items.map((el, key) => (
        <Flex alignItems="center" gap="20px" key={key}>
          <Box width="100px"><MiniChartsFlags caption={el.caption} color={el.color} /></Box>
          <Box width="100%">
            <Box width={el.width} height="20px" backgroundColor={el.chartColor} textAlign="right" borderRadius="2px" padding="1px 5px"><AppTypography color="#333">{el.value}</AppTypography></Box>
          </Box>
        </Flex>
      ))}
    </VStack>
  )
}

export default ProfitChart