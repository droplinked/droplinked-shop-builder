import { Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice';
import React from 'react';

interface Props {
    title: string;
    value: number;
    isValueBold?: boolean;
}

function CartSummaryRow({ title, value, isValueBold = false }: Props) {
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <AppTypography fontSize={16} color={"white"}>{title}</AppTypography>
            <AppTypography
                fontSize={isValueBold ? 20 : 16}
                fontWeight={isValueBold ? 700 : 400}
                color={"white"}
            >
                <FormattedPrice price={value} abbreviationProps={{ color: 'neutral.gray.400', fontSize: 16 }} />
            </AppTypography>
        </Flex>
    )
}

export default CartSummaryRow