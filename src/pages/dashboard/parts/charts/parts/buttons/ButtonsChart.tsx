import { Flex, Icon } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext, useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import dashboardChartsContext from '../../context';

function ButtonsChart() {
    const { method: { updateStates }, states: { date } } = useContext(dashboardChartsContext)
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => options[currentIndex] !== date && updateStates('date', options[currentIndex]), [currentIndex])

    const options = ["MONTHLY", 'YEARLY']

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % options.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + options.length) % options.length);
    };

    return (
        <Flex justifyContent="end" gap="24px">
            <Flex gap="8px" cursor="pointer" alignItems="center" onClick={handlePrev}>
                <Icon as={FaChevronLeft} width="8px" />
                <AppTypography>Previous</AppTypography>
            </Flex>
            <Flex gap="8px" cursor="pointer" alignItems="center" onClick={handleNext}>
                <AppTypography>Next</AppTypography>
                <Icon as={FaChevronRight} width="8px" />
            </Flex>
        </Flex>
    )
}

export default ButtonsChart