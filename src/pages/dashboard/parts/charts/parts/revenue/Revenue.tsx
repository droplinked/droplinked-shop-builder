import { VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import AppTypography from 'components/common/typography/AppTypography'
import moment from 'moment';
import dashboardPageContext from 'pages/dashboard/context';
import React, { useContext } from 'react'
import dashboardChartsContext from '../../context';
import useAppStore from 'lib/stores/app/appStore';
import { currencyConvertion } from 'lib/utils/helpers/currencyConvertion';

function Revenue() {
    const { states: { dateRange: { from, to } } } = useContext(dashboardPageContext)
    const { states: { revenue }, isLoading } = useContext(dashboardChartsContext)
    const { shop: { currency } } = useAppStore();

    return (
        <VStack align="stretch" spacing="4px">
            <AppTypography fontSize="16px">Total earnings</AppTypography>
            <AppSkeleton isLoaded={isLoading}>
                <AppTypography fontSize="32px" fontWeight="600">{currency?.symbol}{currencyConvertion(revenue?.total, currency?.conversionRateToUSD, false)} {currency?.abbreviation}</AppTypography>
            </AppSkeleton>
            <AppTypography fontSize="12px" color="#C4C4C4">Your revenue from <strong>{moment(from).format('YYYY/MM/DD')}</strong> to <strong>{moment(to).format('YYYY/MM/DD')}</strong></AppTypography>
        </VStack>
    )
}

export default Revenue