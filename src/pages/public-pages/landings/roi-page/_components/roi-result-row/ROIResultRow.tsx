import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

interface Props {
    title: string;
    value: number;
}

function ROIResultRow({ title, value }: Props) {
    const sign = title === "Return on Investment (ROI)" ? "%" : "$"
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} gap={3}>
            <Box as='span' width={"60%"}>{title}</Box>
            <Box as='span' whiteSpace={"nowrap"}>{`${sign}${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}</Box>
        </Flex>
    )
}

export default ROIResultRow