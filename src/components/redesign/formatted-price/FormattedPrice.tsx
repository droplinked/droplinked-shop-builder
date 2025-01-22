import { BoxProps } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import { useCurrencyConverter } from "functions/hooks/useCurrencyConverter/useCurrencyConverter";
import React from "react";

interface Props {
    price: number;
    sx?: BoxProps;
    fontSize?: number;
    fontWeight?: number;
}

export default function FormattedPrice({ price, sx, fontSize, fontWeight }: Props) {
    const { symbol, abbreviation, convertPrice } = useCurrencyConverter();

    return (
        <AppTypography sx={{ span: { color: "#B1B1B1" }, ...sx }} fontSize={fontSize || 14} {...(fontWeight && { fontWeight: fontWeight })} color={"#fff"}>
            {symbol}
            {convertPrice({ amount: price, toUSD: false }).toFixed(2)}
            <span> {abbreviation}</span>
        </AppTypography>
    );
}
