import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

interface Props {
    title: string;
    value: number;
}

function ROIResultRow({ title, value }: Props) {
    const sign = title === "Return on Investment (ROI)" ? "%" : "$";
    const formattedValue = value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} gap={3}>
            <Box as='span' width={"60%"}>{title}</Box>
            <Box as='span' whiteSpace={"nowrap"}>{sign === "$" ? `${sign}${formattedValue}` : `${formattedValue}${sign}` }</Box> 
        </Flex>
    )
}

export default ROIResultRow