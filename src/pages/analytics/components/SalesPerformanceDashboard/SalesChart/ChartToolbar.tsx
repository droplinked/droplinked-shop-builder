import { Flex } from '@chakra-ui/react'
import { ChevronleftSm } from 'assets/icons/Navigation/ChevronLeft/ChevronleftSm'
import { ChevronrightSm } from 'assets/icons/Navigation/ChevronRight/ChevronrightSm'
import StylizedTitle from 'components/redesign/stylized-title/StylizedTitle'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useAnalyticsStore from 'pages/analytics/stores/useAnalyticsStore'
import React from 'react'
import DateRangeNavButton from './DateRangeNavButton'

function ChartToolbar() {
    const { selectedDateRange, setSelectedDateRange } = useAnalyticsStore()
    const { t, isRTL } = useLocaleResources("analyticsPage")

    const PrevIcon = isRTL ? ChevronrightSm : ChevronleftSm
    const NextIcon = isRTL ? ChevronleftSm : ChevronrightSm

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
        setSelectedDateRange([newStart, newEnd])
    }

    function handleNextClick() {
        if (!isValidRange || isNextDisabled) return

        const newStart = new Date(start.getTime() + duration)
        const newEnd = new Date(end.getTime() + duration)
        setSelectedDateRange([newStart, newEnd])
    }

    return (
        <Flex justifyContent="space-between">
            <Flex gap={12}>
                <StylizedTitle bgColor="#2BCFA1" title={t('direct')} />
                <StylizedTitle bgColor="#C5A3FF" title={t('common:affiliate')} />
            </Flex>

            <Flex gap={4}>
                <DateRangeNavButton isDisabled={isPrevDisabled} onClick={handlePrevClick}>
                    <PrevIcon color={isPrevDisabled ? '#4F4F4F' : '#FFF'} />
                    {t('ChartToolbar.prev')}
                </DateRangeNavButton>

                <DateRangeNavButton isDisabled={isNextDisabled} onClick={handleNextClick}>
                    {t('ChartToolbar.next')}
                    <NextIcon color={isNextDisabled ? '#4F4F4F' : '#FFF'} />
                </DateRangeNavButton>
            </Flex>
        </Flex>
    )
}

export default ChartToolbar