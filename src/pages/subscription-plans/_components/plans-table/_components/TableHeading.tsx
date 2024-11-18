import { VStack } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import * as React from 'react';

function TableHeading() {
    return (
        <VStack>
            <AppTypography color={"white"} fontSize={"28px"} fontWeight={700}>Find the Perfect Plan for Your Needs</AppTypography>
            <AppTypography color={"#B1B1B1"} width={"702px"} textAlign={"center"} fontSize={"20px"} fontWeight={400}>Compare our plans in detail to see which one best suits your business goals and budget.</AppTypography>
        </VStack>
    );
}

export default TableHeading;