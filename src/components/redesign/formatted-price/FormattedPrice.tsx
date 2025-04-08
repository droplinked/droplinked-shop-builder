import { Box, BoxProps, Text, TextProps } from "@chakra-ui/react"
import { useCurrencyConverter } from "hooks/useCurrencyConverter/useCurrencyConverter"
import React from "react"

interface Props extends TextProps {
    price: number
    abbreviationProps?: BoxProps
}

export default function FormattedPrice({ price, abbreviationProps, ...rest }: Props) {
    const { symbol, abbreviation, convertPrice } = useCurrencyConverter()

    // Convert and format the price
    const formattedPrice = formatPrice(convertPrice({ amount: price, toUSD: false }))

    return (
        <Text color="#fff" {...rest}>
            {symbol}
            {formattedPrice}{" "}
            <Box as="span" color="#B1B1B1" {...abbreviationProps}>
                {abbreviation}
            </Box>
        </Text>
    )
}

function formatPrice(price: number): string {
    return price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}