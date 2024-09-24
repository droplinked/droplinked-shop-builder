import { Box, Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';

interface Props {
    title: string;
    value: number;
    isValueBold?: boolean;
}

function CartSummaryRow({ title, value, isValueBold = false }: Props) {
    const formattedPrice = (price: number) => {
        const validPrice = isNaN(price) ? 0 : price
        return `$${validPrice.toFixed(2)} `
    }

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <AppTypography fontSize={16} color={"white"}>{title}</AppTypography>
            <AppTypography
                fontSize={isValueBold ? 20 : 16}
                fontWeight={isValueBold ? 700 : 400}
                color={"white"}
            >
                {formattedPrice(value)}
                <Box as='span' fontSize={16} color={'#878787'}>{"USD"}</Box>
            </AppTypography>
        </Flex>
    )
}

export default CartSummaryRow