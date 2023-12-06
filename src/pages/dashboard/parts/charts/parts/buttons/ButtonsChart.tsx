import { Flex, Icon } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

function ButtonsChart() {
    return (
        <Flex justifyContent="end" gap="24px">
            <Flex gap="8px" cursor="pointer" alignItems="center">
                <Icon as={FaChevronLeft} width="8px" />
                <AppTypography>Previous</AppTypography>
            </Flex>
            <Flex gap="8px" cursor="pointer" alignItems="center">
                <AppTypography>Next</AppTypography>
                <Icon as={FaChevronRight} width="8px" />
            </Flex>
        </Flex>
    )
}

export default ButtonsChart