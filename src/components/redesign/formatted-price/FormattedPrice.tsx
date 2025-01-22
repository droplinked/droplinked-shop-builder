import { BoxProps } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import { useCurrencyConverter } from "functions/hooks/useCurrencyConverter/useCurrencyConverter";
import React from "react";

interface Props {
    price: number
    sx?: BoxProps
}

export default function FormattedPrice({ price, sx }: Props) {
    const { symbol, abbreviation, convertPrice } = useCurrencyConverter();

    return (
        <AppTypography sx={{ span: { color: "#B1B1B1" }, ...sx }} color={"#fff"} fontSize={14}>
            {symbol}
            {convertPrice({ amount: price, toUSD: false }).toFixed(2)}
            <span> {abbreviation}</span>
        </AppTypography>
    );
}
