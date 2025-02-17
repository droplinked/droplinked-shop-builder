import { Box, Flex, Skeleton, Text } from '@chakra-ui/react'
import AppDateRangePicker from 'components/redesign/date-range-picker/AppDateRangePicker'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import useFormattedDateRange from 'pages/analytics/hooks/useFormattedDateRange'
import useAnalyticsStore from 'pages/analytics/stores/useAnalyticsStore'
import React from 'react'

interface Props {
    earnings: number
    isLoading: boolean
}

function EarningsSummary({ earnings, isLoading }: Props) {
    const { selectedDateRange, startDate, endDate } = useFormattedDateRange()
    const updateAnalyticsPageState = useAnalyticsStore(state => state.updateAnalyticsPageState)

    return (
        <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems="start"
            gap={3}
            padding={{ base: 4, lg: 6 }}
        >
            {/* Left section: Earnings and Income period */}
            <Flex direction="column" gap={2}>
                <Text fontSize={{ base: 14, lg: 16 }} color="#FFF">Earnings</Text>

                <Skeleton isLoaded={!isLoading}>
                    <FormattedPrice
                        price={earnings ?? 0}
                        marginTop={{ base: -1, md: 'unset' }}
                        fontSize={{ base: 20, lg: 24 }}
                        fontWeight={500}
                        abbreviationProps={{ color: '#7B7B7B' }}
                    />
                </Skeleton>

                <Text fontSize={14} color="#7B7B7B" sx={{ span: { fontWeight: 500, color: '#B1B1B1' } }}>
                    Income from <Box as="span">{startDate}</Box> to <Box as="span">{endDate}</Box>.
                </Text>
            </Flex>

            {/* Right section: Date Picker */}
            <AppDateRangePicker
                value={selectedDateRange}
                onChange={(value) => updateAnalyticsPageState('selectedDateRange', value)}
            />
        </Flex>
    )
}

export default EarningsSummary