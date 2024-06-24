import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

interface Props {
    title?: string;
    value?: number;
}

function ROIResultRow({ title = "-", value = NaN }: Props) {
    const sign = title === "Return on Investment (ROI)" ? "%" : "$";
    const formattedValue = isNaN(value) ? "-" : value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} gap={3}>
            <Box as='span' width={"60%"}>{title}</Box>
            <Box as='span' whiteSpace={"nowrap"}>{formattedValue === "-" ? "-" : (sign === "$" ? `${sign}${formattedValue}` : `${formattedValue}${sign}`)}</Box>
        </Flex>
    );
}

export default ROIResultRow;
