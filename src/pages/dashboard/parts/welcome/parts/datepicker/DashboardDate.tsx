import { Box, BoxProps, Flex, Icon } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography';
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers';
import dashboardPageContext from 'pages/dashboard/context';
import React, { useCallback, useContext, useMemo } from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import dashboardDatepickerModel, { IdashboardDatepickerTime } from './parts/datepicker/model';
function DashboardDate() {
    const { states: { dateRange: { value, from, to } }, method: { updateDateRange } } = useContext(dashboardPageContext)
    const { ranges, getDateRange, prevNextDateRange } = dashboardDatepickerModel

    const style: BoxProps = {
        padding: '8px 16px',
        cursor: 'pointer',
        borderRadius: "4px"
    }

    const setRange = useCallback((el) => {        
        const range = getDateRange({ range: el, startDate: new Date() })
        updateDateRange('from', range.from)
        updateDateRange('to', range.to)
        updateDateRange('value', el)
    }, [])

    const changeRange = useCallback((operation: IdashboardDatepickerTime) => {
        const range = prevNextDateRange({ range: value, startDate: from, operation })
        updateDateRange('from', range.from)
        updateDateRange('to', range.to)
    }, [from])

    const nextAvailble = useMemo(() => new Date().getTime() >= to.getTime(), [to])

    return (
        <Flex position="relative" alignItems="center" gap="12px">
            <Flex alignItems="center" backgroundColor="#1C1C1C" padding="6px" borderRadius="4px">
                {ranges.map((el, key) => (
                    <Box key={key} {...style} onClick={() => setRange(el)} backgroundColor={el === value ? '#2BCFA1' : ''}><AppTypography color={el === value ? '#333' : "#878787"}>{capitalizeFirstLetter(el)}</AppTypography></Box>
                ))}
            </Flex>
            <Flex alignItems="center" gap="8px">
                <Box backgroundColor="#1C1C1C" onClick={() => changeRange(IdashboardDatepickerTime.subtract)} padding="6px" borderRadius="4px" {...style}><Icon as={FaChevronLeft} fill="#FFF" width="12px" height="12px" /></Box>
                <Box backgroundColor="#1C1C1C" opacity={nextAvailble ? '1' : '.4'} onClick={() => nextAvailble ? changeRange(IdashboardDatepickerTime.add) : {}} padding="6px" borderRadius="4px" {...style}><Icon as={FaChevronRight} fill="#FFF" width="12px" height="12px" /></Box>
            </Flex>
        </Flex>
    )
}

export default DashboardDate