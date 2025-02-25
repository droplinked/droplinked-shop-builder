import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import useAnalyticsStore from 'pages/analytics/stores/useAnalyticsStore'
import React from 'react'
import StylizedTitle from '../../StylizedTitle'
import DateRangeNavButton from './DateRangeNavButton'

export default function ChartToolbar() {
    const { selectedDateRange, updateAnalyticsPageState } = useAnalyticsStore()

    // Normalize the union type into a tuple.
    // If selectedDateRange is not an array, assume it's a single date.
    const [start, end] = Array.isArray(selectedDateRange)
        ? selectedDateRange
        : [selectedDateRange, selectedDateRange]

    // Verify that both dates are valid (non-null and instances of Date).
    const isValidRange = start instanceof Date && end instanceof Date

    // Only compute duration and nextEnd if both dates are valid.
    let duration = 0
    let nextEnd: Date | null = null
    let isNextDisabled = false

    if (isValidRange) {
        duration = end.getTime() - start.getTime()
        nextEnd = new Date(end.getTime() + duration)

        // Disable the Next button if the new end date is in the future.
        const today = new Date()
        isNextDisabled = nextEnd.getTime() > today.getTime()
    }

    const handlePrevClick = () => {
        if (!isValidRange) return

        const newStart = new Date(start.getTime() - duration)
        const newEnd = new Date(end.getTime() - duration)
        updateAnalyticsPageState('selectedDateRange', [newStart, newEnd])
    }

    const handleNextClick = () => {
        if (!isValidRange || isNextDisabled) return

        const newStart = new Date(start.getTime() + duration)
        const newEnd = new Date(end.getTime() + duration)
        updateAnalyticsPageState('selectedDateRange', [newStart, newEnd])
    }

    return (
        <Flex justifyContent="space-between">
            <Flex gap={12}>
                <StylizedTitle bgColor="#2BCFA1" title="Direct" />
                <StylizedTitle bgColor="#C5A3FF" title="Affiliate" />
            </Flex>

            <Flex gap={4}>
                <DateRangeNavButton onClick={handlePrevClick} isDisabled={!isValidRange}>
                    <AppIcons.ChevronLeft color='white' />
                    Prev
                </DateRangeNavButton>

                <DateRangeNavButton onClick={handleNextClick} isDisabled={!isValidRange || isNextDisabled}>
                    Next
                    <AppIcons.ChevronRight color='white' />
                </DateRangeNavButton>
            </Flex>
        </Flex>
    )
}