import { Flex, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import AppTypography from 'components/common/typography/AppTypography'
import moment from 'moment';
import dashboardPageContext from 'pages/dashboard/context';
import React, { useContext, useMemo } from 'react'
import dashboardChartsContext from '../../context';

function Revenue() {
    const { states: { dateRange: { from, to } } } = useContext(dashboardPageContext)
    const { states: { revenue }, isLoading } = useContext(dashboardChartsContext)

    return (
        <VStack align="stretch" spacing="3px">
            <AppTypography fontSize="16px">Total earning</AppTypography>
            <AppSkeleton isLoaded={isLoading}>
                <Flex alignItems="center" gap="12px">
                    <AppTypography fontSize="32px" fontWeight="600">${revenue?.total.toFixed(2)} USD</AppTypography>
                </Flex>
            </AppSkeleton>
            <AppTypography fontSize="12px" color="#C4C4C4">Your revenue from <strong>{moment(from).format('YYYY/MM/DD')}</strong> to <strong>{moment(to).format('YYYY/MM/DD')}</strong></AppTypography>
        </VStack>
    )
}

export default Revenue