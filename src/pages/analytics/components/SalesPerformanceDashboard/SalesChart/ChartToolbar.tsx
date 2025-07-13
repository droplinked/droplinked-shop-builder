import { Flex } from '@chakra-ui/react'
import { ChevronleftSm } from 'assets/icons/Navigation/ChevronLeft/ChevronleftSm'
import { ChevronrightSm } from 'assets/icons/Navigation/ChevronRight/ChevronrightSm'
import StylizedTitle from 'components/redesign/stylized-title/StylizedTitle'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useAnalyticsStore from 'pages/analytics/stores/useAnalyticsStore'
import React from 'react'
import DateRangeNavButton from './DateRangeNavButton'

function ChartToolbar() {
    const { selectedDateRange, updateAnalyticsPageState } = useAnalyticsStore()
    const { t } = useLocaleResources("analyticsPage")

    const [start, end] = Array.isArray(selectedDateRange)
        ? selectedDateRange
        : [selectedDateRange, selectedDateRange]

    const isValidRange = start instanceof Date && end instanceof Date

    let duration = 0
    let nextEnd: Date | null = null
    const isPrevDisabled = !isValidRange
    let isNextDisabled = !isValidRange

    if (isValidRange) {
        duration = end.getTime() - start.getTime()
        nextEnd = new Date(end.getTime() + duration)
        const today = new Date()
        isNextDisabled = nextEnd.getTime() > today.getTime()
    }

    function handlePrevClick() {
        if (!isValidRange) return

        const newStart = new Date(start.getTime() - duration)
        const newEnd = new Date(end.getTime() - duration)
        updateAnalyticsPageState('selectedDateRange', [newStart, newEnd])
    }

    function handleNextClick() {
        if (!isValidRange || isNextDisabled) return

        const newStart = new Date(start.getTime() + duration)
        const newEnd = new Date(end.getTime() + duration)
        updateAnalyticsPageState('selectedDateRange', [newStart, newEnd])
    }

    return (
        <Flex justifyContent="space-between">
            <Flex gap={12}>
                <StylizedTitle bgColor="#2BCFA1" title={t('direct')} />
                <StylizedTitle bgColor="#C5A3FF" title={t('affiliate')} />
            </Flex>

            <Flex gap={4}>
                <DateRangeNavButton onClick={handlePrevClick} isDisabled={isPrevDisabled}>
                    <ChevronleftSm color={isPrevDisabled ? '#4F4F4F' : 'white'} />
                    {t('prev')}
                </DateRangeNavButton>

                <DateRangeNavButton onClick={handleNextClick} isDisabled={isNextDisabled}>
                    {t('next')}
                    <ChevronrightSm color={isNextDisabled ? '#4F4F4F' : 'white'} />
                </DateRangeNavButton>
            </Flex>
        </Flex>
    )
}

export default ChartToolbar