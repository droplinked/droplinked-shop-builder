import { Flex, Skeleton, Text } from '@chakra-ui/react'
import AppDateRangePicker from 'components/redesign/date-range-picker/AppDateRangePicker'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useFormattedDateRange from 'pages/analytics/hooks/useFormattedDateRange'
import useAnalyticsStore from 'pages/analytics/stores/useAnalyticsStore'
import React from 'react'

interface Props {
    earnings: number
    isLoading: boolean
}

function EarningsSummary({ earnings, isLoading }: Props) {
    const { selectedDateRange, startDate, endDate } = useFormattedDateRange()
    const setSelectedDateRange = useAnalyticsStore(state => state.setSelectedDateRange)
    const { t } = useLocaleResources("analyticsPage")

    return (
        <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems="start"
            gap={4}
            padding={{ base: 4, lg: 6 }}
        >
            {/* Left section: Earnings and Income period */}
            <Flex direction="column" gap={{ base: 1, md: 2 }}>
                <Text fontSize={{ base: 14, xl: 16 }} color="text.white">{t('EarningsSummary.earnings')}</Text>

                <Skeleton isLoaded={!isLoading}>
                    <FormattedPrice
                        price={earnings ?? 0}
                        fontSize={{ base: 20, xl: 24 }}
                        fontWeight={500}
                        abbreviationProps={{ color: 'text.subtext.placeholder.dark' }}
                    />
                </Skeleton>

                <Text
                    marginTop={{ base: 1 }}
                    fontSize={14}
                    color="text.subtext.placeholder.dark"
                    sx={{ span: { fontWeight: 500, color: 'text.subtext.placeholder.light' } }}
                >
                    {t('EarningsSummary.incomePeriod', { startDate, endDate })}
                </Text>
            </Flex>

            {/* Right section: Date Picker */}
            <AppDateRangePicker
                value={selectedDateRange}
                onChange={(value) => setSelectedDateRange(value)}
            />
        </Flex>
    )
}

export default EarningsSummary