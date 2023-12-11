import { Flex, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext, useMemo } from 'react'
import dashboardChartsContext from '../../context';

function Revenue() {
    const { states: { revenue, date }, isLoading } = useContext(dashboardChartsContext)

    const range = useMemo(() => ({
        from: date === 'YEARLY' ? 'January ' + new Date().getFullYear() : 'Monday',
        to: date === 'YEARLY' ? 'December ' + new Date().getFullYear() : 'Sunday'
    }), [date])

    return (
        <VStack align="stretch" spacing="12px">
            <AppTypography fontSize="16px">Revenue</AppTypography>
            <AppSkeleton isLoaded={isLoading}>
                <Flex alignItems="center" gap="12px">
                    <AppTypography fontSize="32px" fontWeight="600">${revenue?.total.toFixed(2)}</AppTypography>
                </Flex>
            </AppSkeleton>
            <AppTypography fontSize="12px" color="#C4C4C4">Your revenue from <strong>{range.from}</strong> to <strong>{range.to}</strong></AppTypography>
        </VStack>
    )
}

export default Revenue