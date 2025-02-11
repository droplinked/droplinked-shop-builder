import { Box, Flex, Text } from '@chakra-ui/react'
import AppDateRangePicker from 'components/redesign/date-range-picker/AppDateRangePicker'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import { formatDateLongStyle } from 'lib/utils/helpers/helpers'
import useAnalyticsStore from 'pages/new-analytics/stores/useAnalyticsStore'
import React from 'react'

function EarningsSummary() {
    const { selectedDateRange, updateAnalyticsPageState } = useAnalyticsStore((state) => ({
        selectedDateRange: state.selectedDateRange,
        updateAnalyticsPageState: state.updateAnalyticsPageState
    }))

    const startDate = selectedDateRange[0]
    const endDate = selectedDateRange[1]

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

                <FormattedPrice
                    price={425868.99}
                    marginTop={{ base: -1, md: 'unset' }}
                    fontSize={{ base: 20, lg: 24 }}
                    fontWeight={500}
                    abbreviationProps={{ color: '#7B7B7B' }}
                />

                <Text fontSize={14} color="#7B7B7B" sx={{ span: { fontWeight: 500, color: '#B1B1B1' } }}>
                    Income from <Box as="span">{formatDateLongStyle(startDate)}</Box> to <Box as="span">{formatDateLongStyle(endDate)}</Box>.
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