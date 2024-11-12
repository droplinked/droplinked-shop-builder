import { Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';

export const DefaultCurrencyDescription = () => (
    <Flex direction={"column"} width={"50%"}>
        <AppTypography fontSize="18px" fontWeight="regular" color={"white"}>
            Default Currency
        </AppTypography>
        <AppTypography fontSize="16px" fontWeight="regular" color={"#7B7B7B"}>
            Choose the default currency for all storefront products.
        </AppTypography>
    </Flex>
);