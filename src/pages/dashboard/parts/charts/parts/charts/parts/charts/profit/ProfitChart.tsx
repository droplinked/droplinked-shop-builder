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
    return data?.affiliate || data?.direct || data?.value ? [
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
    ] : null
  }, [revenue])

  return (
    <>
      {items ? (
        <VStack align="stretch" spacing="12px">
          <AppSkeleton isLoaded={isLoading}>
            <AppTypography fontSize="18px" fontWeight="600">${revenue?.report?.profit?.value.toFixed(2)} USD</AppTypography>
          </AppSkeleton>
          <AppSkeleton isLoaded={isLoading}>
            <VStack align="stretch" spacing="8px">
              {items.map((el, key) => (
                <Flex alignItems="center" gap="20px" key={key}>
                  <Box width="100px"><MiniChartsFlags caption={el.caption} color={el.color} /></Box>
                  <Box width="100%">
                    <Box width={el.width + '%'} minWidth="52px" height="20px" backgroundColor={el.chartColor} textAlign="right" borderRadius="2px" padding="1px 5px">
                      <AppTypography color="#333">${el.value} USD</AppTypography>
                    </Box>
                  </Box>
                </Flex>
              ))}
            </VStack>
          </AppSkeleton>
        </VStack>
      ) : <DashboardEmpty minHeight="100px" />}
    </>
  )
}

export default ProfitChart