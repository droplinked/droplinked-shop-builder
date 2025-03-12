import { Box, Flex } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import * as React from 'react';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';

function CustomHeader({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) {
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' }); // Changed line

    return (
        <Flex bg={"#0d0d0d"} px={3} py={4} borderTopRadius={"16px"} borderBottom={"1px solid"} borderColor={"neutral.gray.800"} justifyContent={"space-between"} alignItems={"center"}>
            <Flex gap={1}>
                <AppTypography fontWeight={500} color={"neutral.white"}>{month}</AppTypography>
                <AppTypography fontWeight={500} color={"neutral.white"}>{year}</AppTypography>
            </Flex>
            <Flex gap={"20px"}>
                <Box onClick={() => !prevMonthButtonDisabled && decreaseMonth()} cursor={prevMonthButtonDisabled ? "not-allowed" : "pointer"} opacity={prevMonthButtonDisabled ? "0.5" : "1"}>
                    <AppIcons.ChevronLeft color='neutral.white' />
                </Box>
                <Box onClick={() => !nextMonthButtonDisabled && increaseMonth()} cursor={nextMonthButtonDisabled ? "not-allowed" : "pointer"} opacity={nextMonthButtonDisabled ? "0.5" : "1"}>
                    <AppIcons.ChevronRight color='neutral.white' />
                </Box>
            </Flex>
        </Flex>
    )
}

export default CustomHeader;