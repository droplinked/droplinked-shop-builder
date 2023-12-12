import { Box, Flex, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import { getPercentage } from 'lib/utils/heper/helpers'
import dashboardChartsContext from 'pages/dashboard/parts/charts/context'
import DashboardEmpty from 'pages/dashboard/parts/parts/empty/DashboardEmpty'
import React, { useContext, useMemo } from 'react'
import MiniChartsFlags from '../../flags/MiniChartsFlags'

function ProfitChart() {
  const { states: { revenue }, isLoading } = useContext(dashboardChartsContext)

  const items: any = useMemo(() => {
    const data = revenue?.report?.profit
    return [
      {
        caption: 'Direct',
        color: 'green',
        value: data?.direct,
        width: getPercentage(data?.direct, data?.value),
        chartColor: '#2BCFA1'
      },
      {
        caption: 'Affiliate',
        color: 'purple',
        value: data?.affiliate,
        width: getPercentage(data?.affiliate, data?.value),
        chartColor: '#9C4EFF'
      }
    ]
  }, [revenue])

  return (
    <>
      {revenue?.report.length ? (
        <VStack align="stretch">
          <AppSkeleton isLoaded={isLoading}>
            <AppTypography fontSize="18px" fontWeight="600">${revenue?.report?.profit?.value}</AppTypography>
          </AppSkeleton>
          <AppSkeleton isLoaded={isLoading}>
            {items.map((el, key) => (
              <Flex alignItems="center" gap="20px" key={key}>
                <Box width="100px"><MiniChartsFlags caption={el.caption} color={el.color} /></Box>
                <Box width="100%">
                  <Box width={el.width + '%'} minWidth="30px" height="20px" backgroundColor={el.chartColor} textAlign="right" borderRadius="2px" padding="1px 5px">
                    <AppTypography color="#333">${el.value}</AppTypography>
                  </Box>
                </Box>
              </Flex>
            ))}
          </AppSkeleton>
        </VStack>
      ) : <DashboardEmpty minHeight="100px" />}
    </>
  )
}

export default ProfitChart