import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

interface Props {
    title: string;
    value: number;
}

function ROIResultRow({ title, value }: Props) {
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} gap={3}>
            <Box as='span'>{title}</Box>
            {!!value && <Box as='span'>${value.toFixed(2)}</Box>}
        </Flex>
    )
}

export default ROIResultRow